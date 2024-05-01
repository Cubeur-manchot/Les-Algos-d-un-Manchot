"use strict";

import { View } from "./view.js";

class RecordsView extends View {
	static path = "/records";
	static title = "Records";
	static recordsFormats = [
		{solveCount: 1, name: "Single"},
		{solveCount: 3, name: "Mo3"},
		{solveCount: 5, name: "Ao5"},
		{solveCount: 12, name: "Ao12"},
		{solveCount: 50, name: "Ao50"},
		{solveCount: 100, name: "Ao100"}
	];
	constructor() {
		super();
	};
	getContent = async () => {
		let records = await (await fetch("../data/records.json")).json();
		return [
			this.createH1Tag({textContent: "Records"}),
			this.createTableTag({id: "records"},
				this.createTheadTag({},
					this.createThTag({textContent: "Event"}),
					...RecordsView.recordsFormats.map(recordFormat => this.createThTag({textContent: recordFormat.name}))
				),
				this.createTbodyTag({},
					...records.map(recordItem =>
						this.createTrTag({},
							this.createTdTag({textContent: [recordItem.event.puzzle, recordItem.event.variation].filter(Boolean).join(" ")}),
							...RecordsView.recordsFormats.map(recordFormat =>
								this.createTdTag({textContent:
									recordItem.records[recordFormat.solveCount]?.time
										.toString() // convert numerical values to string (string values are not affected)
										.replace(/(?<!.*\..*)$/, ".00") // add decimal separator if missing (integer values)
										.replace(/(?<=\.\d)$/, "0") // add extra zero if only one digit after decimal separator
									?? "-" // empty if record not available
									}
								)
							)
						)
					)
				)
			)
		];
	};
};

export {RecordsView};
