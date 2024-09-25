"use strict";

class AlgService {
	static eventTitleNames = {
		"big": "Big cubes"
	};
	static getEventTitleName = eventName => AlgService.eventTitleNames[eventName] ?? eventName;
	constructor() {
		this.algsets = null;
		this.algs = null;
	};
	fetchData = async (eventName, algsetName) => {
		[this.algsets, this.algs] = await Promise.all([
			this.fetchJson("algsets"),
			this.fetchJson("algs")
		]);
		this.algsets.forEach(algset => algset.caseCount = this.countCases(algset));
		this.algs = [
			...this.algs["lastLayer"]["1LLL"],
			...this.algs["lastLayer"]["others"],
			...this.algs["others"]
		];
		if (eventName && algsetName) { // return the specified set if any
			return this.findAlgset(eventName, algsetName);
		}
	};
	fetchJson = jsonName =>
		fetch(`/data/${jsonName}.json`)
			.then(response => response.json());
	findAlgset = (eventName, setName) =>
		this.algsets.find(
			algset => algset.events.includes(eventName)
			&& algset.name === setName
		);
	findAlg = algId => this.algs.find(alg => alg.id === algId);
	countCases = algset => algset.subsets
		.map(subset => subset.caseList.length)
		.reduce((total, num) => total + num, 0);
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

export {AlgService};
