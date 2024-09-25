"use strict";

class View {
	constructor() {
		this.mainTag = document.querySelector("main");
	};
	getContent = () => {
		throw "Exception : getting content of abstract view.";
	};
	getTitle = () => this.constructor.title;
	buildView = async () => {
		this.mainTag.innerHTML = "";
		this.mainTag.append(...(await this.getContent()));
		document.title = ["Les Algos d'un Manchot", this.getTitle()].filter(Boolean).join(" | ");
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
	createDialogTag = (options, ...children) => {
		return this.createHtmlTag("dialog", options, children);
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
	createH3Tag = (options, ...children) => {
		return this.createHtmlTag("h3", options, children);
	};
	createHgroupTag = (options, ...children) => {
		return this.createHtmlTag("hgroup", options, children);
	};
	createImgTag = (options, ...children) => {
		return this.createHtmlTag("img", options, children);
	};
	createInputTag = options => {
		return this.createHtmlTag("input", options);
	};
	createLabelTag = (options, ...children) => {
		return this.createHtmlTag("label", options, children);
	};
	createLiTag = (options, ...children) => {
		return this.createHtmlTag("li", options, children);
	};
	createNavTag = (options, ...children) => {
		return this.createHtmlTag("nav", options, children);
	};
	createPTag = (options, ...children) => {
		return this.createHtmlTag("p", options, children);
	};
	createSectionTag = (options, ...children) => {
		return this.createHtmlTag("section", options, children);
	};
	createSpanTag = (options, ...children) => {
		return this.createHtmlTag("span", options, children);
	};
	createTableTag = (options, ...children) => {
		return this.createHtmlTag("table", options, children);
	};
	createTbodyTag = (options, ...children) => {
		return this.createHtmlTag("tbody", options, children);
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
	createUlTag = (options, ...children) => {
		return this.createHtmlTag("ul", options, children);
	};
};

export {View};
