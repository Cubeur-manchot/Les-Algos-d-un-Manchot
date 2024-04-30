"use strict";

class View {
	constructor() {
		this.mainTag = document.querySelector("main");
	};
	getContent = () => {
		throw "Exception : getting content of abstract view.";
	};
	buildView = () => {
		this.mainTag.innerHTML = "";
		this.mainTag.append(...this.getContent());
		document.title = ["Les Algos d'un Manchot", this.constructor.title].filter(Boolean).join(" | ");
	};
	createHtmlTag = (type, options, children = []) => {
		let tag = Object.assign(document.createElement(type), options);
		tag.append(...children);
		return tag;
	};
	createATag = (options, ...children) => {
		return this.createHtmlTag("a", options, children);
	};
	createBrTag = () => {
		return this.createHtmlTag("br", null, []);
	};
	createDivTag = (options, ...children) => {
		return this.createHtmlTag("div", options, children);
	};
	createH1Tag = (options, ...children) => {
		return this.createHtmlTag("h1", options, children);
	};
	createH2Tag = (options, ...children) => {
		return this.createHtmlTag("h2", options, children);
	};
	createImgTag = (options, ...children) => {
		return this.createHtmlTag("img", options, children);
	};
	createNavTag = (options, ...children) => {
		return this.createHtmlTag("nav", options, children);
	};
	createSpanTag = (options, ...children) => {
		return this.createHtmlTag("span", options, children);
	};
	createTableTag = (options, ...children) => {
		return this.createHtmlTag("table", options, children);
	};
	createTdTag = (options, ...children) => {
		return this.createHtmlTag("td", options, children);
	};
	createTheadTag = (options, ...children) => {
		return this.createHtmlTag("thead", options, children);
	};
	createThTag = (options, ...children) => {
		return this.createHtmlTag("th", options, children);
	};
	createTrTag = (options, ...children) => {
		return this.createHtmlTag("tr", options, children);
	};
};

export {View};
