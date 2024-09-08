"use strict";

import { HoloCubeService } from "../services/holoCubeService.js";
import { View } from "./view.js";

class AlgsetView extends View {
	static path = "/algs";
	static events = {
		"3x3": {holoCubePuzzleName: "cube3x3x3"},
		"OH": {holoCubePuzzleName: "cube3x3x3"},
		"big": {holoCubePuzzleName: "cube5x5x5", titleName: "Big cubes"}
	};
	constructor(restOfThePath) {
		super();
		[this.event, this.setName] = restOfThePath.map(pathChunk => pathChunk.replace(/^\//, ""));
		this.holoCubeService = new HoloCubeService();
	};
	getTitle = () => [this.event, this.setName].join(" ");
	getContent = async () => {
		let algset = await this.fetchAlgset();
		if (!algset) { // algset not found
			return [
				this.createPTag({lang: "en", textContent: "Algset not found."}),
				this.createPTag({lang: "fr", textContent: "Set d'algos introuvable."}),
			];
		}
		this.holoCubeService.buildHoloCubeRunner(AlgsetView.events[this.event].holoCubePuzzleName, algset.mask);
		let algs = await this.fetchAlgs();
		let caseCount = algset.subsets
			.map(subset => subset.caseList.length)
			.reduce((total, num) => total + num, 0);
		let subtitleWithCaseCount = [AlgsetView.events[this.event].titleName ?? this.event, caseCount].join (" - ");
		return [
			this.createHgroupTag({id: "main-title"},
				this.createH1Tag({textContent: [algset.name, algset.detailedName].filter(Boolean).join(" - ")}),
				this.createSpanTag({lang: "en", className: "subtitle", textContent: `${subtitleWithCaseCount} cases`}),
				this.createSpanTag({lang: "fr", className: "subtitle", textContent: `${subtitleWithCaseCount} cas`})
			),
			...algset.subsets.map(subset =>
				this.createSectionTag({id: subset.name},
					this.createH2Tag({textContent: subset.name}),
					this.createUlTag({className: "cardList algCardList"},
						...subset.caseList
							.map(algCase => algs.find(alg => alg.id === algCase))
							.map(alg => Object.assign(alg, {algToUse: this.getAlgToUse(alg)}))
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
	fetchAlgset = () => fetch("../data/algsets.json")
		.then(response => response.json())
		.then(algsets => algsets.find(algset => algset.events.includes(this.event) && algset.name === this.setName));
	fetchAlgs = () => fetch("../data/algs.json")
		.then(response => response.json())
		.then(algs =>
			[
				...algs["lastLayer"]["1LLL"],
				...algs["lastLayer"]["others"],
				...algs["others"]
			]
		);
	getAlgToUse = alg => {
		if (this.event === "3x3" || !alg.alt) {
			return alg.alg; // default alg
		}
		switch (typeof alg.alt) {
			case "string": return alg.alt; // one alternative alg for all variations
			case "object": return alg.alt[this.event] ?? alg.alg; // alternatives per variation
		}
	};
};

export {AlgsetView};
