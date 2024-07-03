"use strict";

import { View } from "./view.js";

class HomeView extends View {
	static path = "/home";
	static title = "Home";
	constructor() {
		super();
	};
	getContent = () =>
		[
			this.createH2Tag({textContent: "Others", lang: "en"}),
			this.createH2Tag({textContent: "Autres", lang: "fr"}),
			this.createNavTag({id: "navigation"},
				this.createNavigationCard("Cubeurs Francophones", "Cubeurs Francophones", "../images/logos/discord.svg", "https://discord.gg/MZ75mtHdGZ"),
				this.createNavigationCard("French UNR List", "Liste UNR de France", "../images/logos/unrList.png", "https://cubeur-manchot.github.io/Liste-UNR-de-France/"),
				this.createNavigationCard("Records", "Records", "../images/logos/records.png", "/records"),
				this.createNavigationCard("Collection", "Collection", "../images/logos/collection.png", "/collection"),
				this.createNavigationCard("My Drive", "Mon Drive", "../images/logos/drive.png","https://drive.google.com/drive/folders/0B23xBbKROAE4fjlDSWNZSFAyUHJvSm1HelpUdHpsMzlMTVdQa0VqdldIbHc5RThnVVFvX2M?usp=sharing"),
				this.createNavigationCard("Contact", "Contact", "../images/logos/avatar.png","/contact")
			)
		];
	createNavigationCard = (titleEnglish, titleFrench, src, href) =>
		this.createATag({className: "navigationCard", href},
			this.createImgTag({className: "navigationCard__image", src}),
			this.createDivTag({className: "navigationCard__textZone"},
				this.createSpanTag({className: "navigationCard__title", textContent: titleEnglish, lang: "en"}),
				this.createSpanTag({className: "navigationCard__title", textContent: titleFrench, lang: "fr"})
			)
		);
};

export {HomeView};
