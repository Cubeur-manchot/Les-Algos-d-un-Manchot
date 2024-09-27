"use strict";

import { View } from "./view.js";

class ContactView extends View {
	static path = "/contact";
	static title = "Contact";
	constructor() {
		super();
	};
	getContent = async () => {
		let contacts = await this.dataService.getJson("contacts");
		return [
			this.createH1Tag({textContent: "Contact"}),
			this.createDivTag({className: "table-outer-container"},
				this.createDivTag({className: "table-inner-container"},
					this.createTableTag({id: "contact", className: "table-grid"},
						this.createTheadTag({},
							this.createTrTag({},
								this.createThTag({lang: "en", textContent: "Platform"}),
								this.createThTag({lang: "fr", textContent: "Plateforme"}),
								this.createThTag({textContent: "Pseudo"}),
								this.createThTag({lang: "en", textContent: "Link"}),
								this.createThTag({lang: "fr", textContent: "Lien"})
							)
						),
						this.createTbodyTag({},
							...contacts.map(contact =>
								this.createTrTag({},
									this.createTdTag({textContent: contact.platform}),
									this.createTdTag({textContent: contact.pseudo}),
									this.createTdTag({},
										this.createATag({href: contact.link.href},
											this.createSpanTag({lang: "en", textContent: contact.link.text.en}),
											this.createSpanTag({lang: "fr", textContent: contact.link.text.fr})
										)
									)
								)
							)
						)
					)
				)
			)
		];
	};
};

export {ContactView};
