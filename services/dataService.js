"use strict";

class DataService {
	static postProcessMethods = {
		"algs": data => [...data["lastLayer"]["1LLL"], ...data["lastLayer"]["others"], ...data["others"]], // flattens to a single list
		"algsets": data => data.map(algset => Object.assign(algset, {caseCount: DataService.countCases(algset)})), // add case count
		"collection": data => data.filter(collectionItem => collectionItem.puzzle), // keep puzzles only
		"contacts": data => data,
		"records": data => data
	};
	static countCases = algset => algset.subsets
		.map(subset => subset.caseList.length)
		.reduce((total, num) => total + num, 0);
	static eventTitleNames = {"big": "Big cubes"};
	static getEventTitleName = eventName => DataService.eventTitleNames[eventName] ?? eventName;
	constructor() {
		for (let dataType of Object.keys(DataService.postProcessMethods)) {
			this[dataType] = null;
		}
	};
	getJson = async dataType =>
		this[dataType]
			?? (this[dataType] = await this.fetchJson(dataType));
	fetchJson = async dataType =>
		DataService.postProcessMethods[dataType](await fetch(`./data/${dataType}.json`).then(response => response.json()));
	getManyJson = async dataTypeList =>
		await Promise.all(dataTypeList.map(dataType => this.getJson(dataType)));
	findAlg = algId => this.algs.find(alg => alg.id === algId);
};

export {DataService};
