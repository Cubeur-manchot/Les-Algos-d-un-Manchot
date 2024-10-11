"use strict";

import { AlgsetView } from "./algsetView.js";
import { ContactView } from "./contactView.js";
import { CollectionView } from "./collectionView.js";
import { RecordsView } from "./recordsView.js";
import { View } from "./view.js";
import { DataService } from "../services/dataService.js";
import { HoloCubeService } from "../services/holoCubeService.js";

class HomeView extends View {
	static path = "/home";
	static title = "Home";
	constructor() {
		super();
		this.holoCubeService = new HoloCubeService();
	};
	getContent = async () => {
		await this.dataService.getManyJson(["algs", "algsets"]);
		let algsetsGroupedByEvent = this.groupByEventName(
			this.dataService.algsets
			.map(algset => algset.events.map(event => Object.assign({event}, algset)))
			.flat()
		);
		return [
			this.createH1Tag({textContent: "Les algos d'un Manchot"}),
			...algsetsGroupedByEvent.map(algsetsGroup =>
				[
					this.createH2Tag({textContent: DataService.getEventTitleName([algsetsGroup.event])}),
					this.createNavTag({className: "cardList navigationCardList"},
						...algsetsGroup.algsets.map(algset =>
							this.createAlgNavigationCard(algset)
						)
					)
				]
			).flat(),
			this.createH2Tag({textContent: "Others", lang: "en"}),
			this.createH2Tag({textContent: "Autres", lang: "fr"}),
			this.createNavTag({className: "cardList navigationCardList"},
				this.createNavigationCard(false, "Cubeurs Francophones", "Cubeurs Francophones", "./images/logos/discord.svg", "https://discord.gg/MZ75mtHdGZ"),
				this.createNavigationCard(false, "French UNR List", "Liste UNR de France", "./images/logos/unrList.png", "https://cubeur-manchot.github.io/Liste-UNR-de-France/"),
				this.createNavigationCard(true, "Records", "Records", "./images/logos/records.png", RecordsView.path),
				this.createNavigationCard(true, "Collection", "Collection", "./images/logos/collection.png", CollectionView.path),
				this.createNavigationCard(false, "My Drive", "Mon Drive", "./images/logos/drive.png","https://drive.google.com/drive/folders/0B23xBbKROAE4fjlDSWNZSFAyUHJvSm1HelpUdHpsMzlMTVdQa0VqdldIbHc5RThnVVFvX2M?usp=sharing"),
				this.createNavigationCard(true, "Contact", "Contact", "./images/logos/avatar.png", ContactView.path)
			)
		];
	};
	createNavigationCard = (isInternal, titleEnglish, titleFrench, src, href) =>
		this.createATag({className: `card imageCard navigationCard${isInternal ? " internalNavigation" : ""}`, href},
			this.createImgTag({className: "navigationCard__image", src}),
			this.createSpanTag({className: "navigationCard__title", textContent: titleEnglish, lang: "en"}),
			this.createSpanTag({className: "navigationCard__title", textContent: titleFrench, lang: "fr"})
		);
	createAlgNavigationCard = algset => {
		this.holoCubeService.buildHoloCubeRunner(HoloCubeService.holoCubePuzzleNames[algset.event], algset.mask);
		return this.createATag({className: "card imageCard navigationCard internalNavigation", href: `${AlgsetView.path}/${algset.event}/${algset.name}`},
			this.holoCubeService.createHoloCubeImage(
				this.dataService.findAlg(algset.exampleCase).alg
			),
			this.createSpanTag({className: "navigationCard__title", textContent: algset.name})
		);
	};
	groupByEventName = algsets =>
		Object.entries(algsets.reduce(
			(resultObject, currentItem) => {
				resultObject[currentItem.event].push(currentItem);
				return resultObject;
			}, Object.fromEntries([...new Set(algsets.map(algset => algset.event))].map(event => [event, []]))
		)).map(keyValuePair => {return {event: keyValuePair[0], algsets: keyValuePair[1]}});
};

export {HomeView};
