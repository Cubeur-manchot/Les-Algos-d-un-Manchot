"use strict";

import { View } from "./view.js";

class HomeView extends View {
	constructor() {
		super();
		this.path = "/home";
		this.title = "Home";
	};
	getContent = () =>
		[
			this.createNavTag({id: "navigation"},
				this.createNavigationCard("Cubeurs Francophones", "Cubeurs Francophones", "../images/logos/discord.svg", "https://discord.gg/MZ75mtHdGZ"),
				this.createNavigationCard("French UNR List", "Liste UNR de France", "../images/logos/unrList.png", "https://cubeur-manchot.github.io/Liste-UNR-de-France/"),
				this.createNavigationCard("My Drive", "Mon Drive", "../images/logos/drive.png","https://drive.google.com/drive/folders/0B23xBbKROAE4fjlDSWNZSFAyUHJvSm1HelpUdHpsMzlMTVdQa0VqdldIbHc5RThnVVFvX2M?usp=sharing")
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
