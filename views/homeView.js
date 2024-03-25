"use strict";

import { View } from "./view.js";

class HomeView extends View {
	constructor() {
		super();
		this.path = "/home";
		this.title = "Home";
	};
	getContent = () => {
		return [
			this.createNavTag({id: "navigation"},
				this.createATag({id: "discordLink", href: "https://discord.gg/MZ75mtHdGZ"},
					this.createImgTag({id: "discordLinkImg", src: "../images/logos/discord.svg"})
				),
				this.createATag({id: "unrList", href: "https://cubeur-manchot.github.io/Liste-UNR-de-France/"},
					this.createImgTag({id: "unrListLinkImg", src: "../images/logos/unrList.png"})
				),
				this.createATag({id: "drive", href: "https://drive.google.com/drive/folders/0B23xBbKROAE4fjlDSWNZSFAyUHJvSm1HelpUdHpsMzlMTVdQa0VqdldIbHc5RThnVVFvX2M?usp=sharing"},
					this.createImgTag({id: "driveLinkImg", src: "../images/logos/drive.png"})
				)
			)
		];
	};
};

export {HomeView};
