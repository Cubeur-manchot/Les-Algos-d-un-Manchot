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
		document.title = ["Les Algos d'un Manchot", this.title].filter(Boolean).join(" | ");
	};
	createHtmlTag = (type, options, children = []) => {
		let tag = Object.assign(document.createElement(type), options);
		tag.append(...children);
		return tag;
	};
	createATag = (options, ...children) => {
		return this.createHtmlTag("a", options, children);
	};
	createDivTag = (options, ...children) => {
		return this.createHtmlTag("div", options, children);
	};
	createImgTag = (options, ...children) => {
		return this.createHtmlTag("img", options, children);
	};
	createNavTag = (options, ...children) => {
		return this.createHtmlTag("nav", options, children);
	};
};

export {View};
