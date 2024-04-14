"use strict";

import { View } from "./view.js";

class RecordsView extends View {
	static path = "/records";
	static title = "Records";
	constructor() {
		super();
	};
	getContent = () =>
		[
			this.createH1Tag({textContent: "Records"})
		];
};

export {RecordsView};
