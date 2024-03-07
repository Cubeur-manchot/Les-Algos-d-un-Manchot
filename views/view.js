"use strict";

class View {
	constructor() {
		this.mainTag = document.querySelector("main");
	};
	getContent = () => {
		throw "Getting content of abstract view.";
	};
	buildView = () => {
		this.emptyMainTag();
		// generate and append new content
		let viewContent = this.getContent();
		console.log(viewContent);
		viewContent.forEach(this.appendTagToMain);
	};
	emptyMainTag = () => {
		this.mainTag.innerHTML = "";
	};
	appendTagToMain = tag => {
		this.mainTag.appendChild(tag);
	};
};

export {View};
