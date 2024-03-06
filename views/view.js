"use strict";

class View {
	constructor() {
		// useless ?
	};
	getContent = () => {
		throw "Getting content of abstract view.";
	};
	buildView = () => {
		let viewContent = this.getContent();
		console.log(viewContent);
		//document.querySelector("main").appendChild(viewContent);
	};
};

export {View};
