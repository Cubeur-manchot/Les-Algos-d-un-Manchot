"use strict";

import { AlgService } from "../services/algService.js";
import { HoloCubeService } from "../services/holoCubeService.js";
import { View } from "./view.js";

class AlgsetView extends View {
	static path = "/algs";
	constructor(restOfThePath) {
		super();
		[this.event, this.setName] = restOfThePath.map(pathChunk => pathChunk.replace(/^\//, ""));
		this.holoCubeService = new HoloCubeService();
		this.algService = new AlgService();
	};
	getTitle = () => [this.event, this.setName].join(" ");
	getContent = async () => {
		let algset = await this.algService.fetchData(this.event, this.setName);
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
				this.createSpanTag({lang: "en", className: "subtitle", textContent: `${AlgService.getEventTitleName([this.event])} - ${algset.caseCount} cases`}),
				this.createSpanTag({lang: "fr", className: "subtitle", textContent: `${AlgService.getEventTitleName([this.event])} - ${algset.caseCount} cas`})
			),
			...algset.subsets.map(subset =>
				this.createSectionTag({id: subset.name},
					this.createH2Tag({textContent: subset.name}),
					this.createUlTag({className: "cardList algCardList"},
						...subset.caseList
							.map(algId => this.algService.findAlg(algId))
							.map(alg => Object.assign(alg, {algToUse: this.algService.getAlgToUse(alg, this.event)}))
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
};

export {AlgsetView};
