"use strict";

import { View } from "./view.js";

import { Runner } from "https://cubeur-manchot.github.io/Holo-Cube/bundles/holo-cube-algorithm.node-bundle.js";

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
		this.buildHoloCubeRunner(algset);
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
							.map(alg => this.createAlgCard(alg))
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
	buildHoloCubeRunner = algset => {
		this.holoCubeRunner = new Runner({
			puzzle: {
				fullName: AlgsetView.events[this.event].holoCubePuzzleName,
				colorScheme: ["yellow", "green", "orange", "white", "blue", "red"], // yellow top, green front
				mask: {
					stage: algset.mask
				}
			},
			drawingOptions: {
				puzzleScale: 0.85
			},
			logger: {
				mode: "none"
			}
		});
	};
	createAlgCard = alg => {
		let algToUse = this.getAlgToUse(alg);
		return this.createLiTag({className: "card imageCard algCard"},
			this.createHoloCubeImage(algToUse),
			this.createH3Tag({className: "algCard__title", textContent: alg.name}),
			this.createPTag({className: "algCard__content", textContent: algToUse})
		);
	};
	getAlgToUse = alg => {
		if (this.event === "3x3" || !alg.alt) {
			return alg.alg; // default alg
		}
		switch (typeof alg.alt) {
			case "string": return alg.alt; // one alternative alg for all variations
			case "object": return alg.alt[this.event] ?? alg.alg; // alternatives per variation
		}
	};
	createHoloCubeImage = alg => this.holoCubeRunner.run(this.reverseAlg(alg)).svg;
	reverseAlg = alg => alg.split(" ").map(move => move.endsWith("'") ? move.slice(0, -1) : `${move}'`).reverse().join(" ");
};

export {AlgsetView};
