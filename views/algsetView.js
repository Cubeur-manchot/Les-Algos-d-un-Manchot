"use strict";

import { DataService } from "../services/dataService.js";
import { HoloCubeService } from "../services/holoCubeService.js";
import { View } from "./view.js";

class AlgsetView extends View {
	static path = "/algs";
	constructor(restOfThePath) {
		super();
		[this.event, this.setName] = restOfThePath.map(pathChunk => pathChunk.replace(/^\//, ""));
		this.holoCubeService = new HoloCubeService();
	};
	getTitle = () => [this.event, this.setName].join(" ");
	getContent = async () => {
		await this.dataService.getManyJson(["algs", "algsets"]);
		let algset = this.findAlgset(this.event, this.setName);
		if (!algset) { // algset not found
			return [
				this.createPTag({lang: "en", textContent: "Algset not found."}),
				this.createPTag({lang: "fr", textContent: "Set d'algos introuvable."}),
			];
		}
		this.holoCubeService.buildHoloCubeRunner(HoloCubeService.holoCubePuzzleNames[this.event], algset.mask, 0.8);
		return [
			this.createHgroupTag({id: "main-title"},
				this.createH1Tag({textContent: [algset.name, algset.detailedName].filter(Boolean).join(" - ")}),
				this.createSpanTag({lang: "en", className: "subtitle", textContent: `${DataService.getEventTitleName([this.event])} - ${algset.caseCount} cases`}),
				this.createSpanTag({lang: "fr", className: "subtitle", textContent: `${DataService.getEventTitleName([this.event])} - ${algset.caseCount} cas`})
			),
			...algset.subsets.map(subset =>
				this.createSectionTag({id: subset.name},
					this.createH2Tag({textContent: subset.name}),
					this.createUlTag({className: "cardList algCardList"},
						...subset.caseList
							.map(algId => this.dataService.findAlg(algId))
							.map(alg => Object.assign(alg, {algToUse: this.getAlgToUse(alg, this.event)}))
							.map(alg =>
								this.createLiTag({className: "card imageCard algCard"},
									this.holoCubeService.createHoloCubeImage(alg.algToUse),
									this.createH3Tag({className: "algCard__title", textContent: alg.name}),
									this.createPTag({className: "algCard__content", textContent: alg.algToUse})
								)
							)
					)
				)
			)
		];
	};
	findAlgset = (eventName, setName) =>
		this.dataService.algsets.find(
			algset => algset.events.includes(eventName)
			&& algset.name === setName
		);
	getAlgToUse = (alg, eventName) => {
		if (eventName === "3x3" || !alg.alt) {
			return alg.alg; // default alg
		}
		switch (typeof alg.alt) {
			case "string": return alg.alt; // one alternative alg for all variations
			case "object": return alg.alt[eventName] ?? alg.alg; // alternatives per variation
		}
	};
};

export {AlgsetView};
