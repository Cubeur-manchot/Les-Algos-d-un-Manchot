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
			this.createH1Tag({textContent: "Records"}),
			this.createTableTag({id: "records"},
				this.createTheadTag({},
					this.createThTag({textContent: "Event"}),
					this.createThTag({textContent: "Single"}),
					this.createThTag({textContent: "Mo3"}),
					this.createThTag({textContent: "Ao5"}),
					this.createThTag({textContent: "Ao12"}),
					this.createThTag({textContent: "Ao50"}),
					this.createThTag({textContent: "Ao100"})
				),
				this.createTrTag({},
					this.createTdTag({textContent: "2x2"}),
					this.createTdTag({textContent: "1.03"}),
					this.createTdTag({textContent: "3.05"}),
					this.createTdTag({textContent: "3.16"}),
					this.createTdTag({textContent: "4.98"}),
					this.createTdTag({textContent: "5.09"}),
					this.createTdTag({textContent: "19.91"})
				),
				this.createTrTag({},
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"})
				),
				this.createTrTag({},
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"})
				),
				this.createTrTag({},
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"}),
					this.createTdTag({textContent: "-"})
				)
			)
		];
};

export {RecordsView};
