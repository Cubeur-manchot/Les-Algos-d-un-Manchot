"use strict";

import { ContactView } from "./contactView.js";
import { CollectionView } from "./collectionView.js";
import { RecordsView } from "./recordsView.js";
import { View } from "./view.js";

class HomeView extends View {
	static path = "/home";
	static title = "Home";
	constructor() {
		super();
	};
	getContent = () =>
		[
			this.createH2Tag({textContent: "Others", lang: "en"}),
			this.createH2Tag({textContent: "Autres", lang: "fr"}),
			this.createNavTag({className: "cardList navigationCardList"},
				this.createNavigationCard(false, "Cubeurs Francophones", "Cubeurs Francophones", "../images/logos/discord.svg", "https://discord.gg/MZ75mtHdGZ"),
				this.createNavigationCard(false, "French UNR List", "Liste UNR de France", "../images/logos/unrList.png", "https://cubeur-manchot.github.io/Liste-UNR-de-France/"),
				this.createNavigationCard(true, "Records", "Records", "../images/logos/records.png", RecordsView.path),
				this.createNavigationCard(true, "Collection", "Collection", "../images/logos/collection.png", CollectionView.path),
				this.createNavigationCard(false, "My Drive", "Mon Drive", "../images/logos/drive.png","https://drive.google.com/drive/folders/0B23xBbKROAE4fjlDSWNZSFAyUHJvSm1HelpUdHpsMzlMTVdQa0VqdldIbHc5RThnVVFvX2M?usp=sharing"),
				this.createNavigationCard(true, "Contact", "Contact", "../images/logos/avatar.png", ContactView.path)
			)
		];
	createNavigationCard = (isInternal, titleEnglish, titleFrench, src, href) =>
		this.createATag({className: `card imageCard navigationCard${isInternal ? " internalNavigation" : ""}`, href},
			this.createImgTag({className: "navigationCard__image", src}),
			this.createSpanTag({className: "navigationCard__title", textContent: titleEnglish, lang: "en"}),
			this.createSpanTag({className: "navigationCard__title", textContent: titleFrench, lang: "fr"})
		);
};

export {HomeView};
