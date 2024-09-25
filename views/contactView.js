"use strict";

import { View } from "./view.js";

class ContactView extends View {
	static path = "/contact";
	static title = "Contact";
	constructor() {
		super();
	};
	getContent = () =>
		[
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
							this.createTrTag({},
								this.createTdTag({textContent: "Discord"}),
								this.createTdTag({textContent: "Cubeur-manchot (@cubeurmanchot)"}),
								this.createTdTag({},
									this.createATag({href: "https://discord.com/channels/329175643877015553"},
										this.createSpanTag({lang: "en", textContent: "Cubeurs Francophones (Discord server)"}),
										this.createSpanTag({lang: "fr", textContent: "Cubeurs Francophones (serveur Discord)"})
									)
								)
							),
							this.createTrTag({},
								this.createTdTag({lang: "en", textContent: "Francocube forum"}),
								this.createTdTag({lang: "fr", textContent: "Forum Francocube"}),
								this.createTdTag({textContent: "Cubeur-manchot"}),
								this.createTdTag({},
									this.createATag({href: "https://forum.francocube.com/ucp.php?i=pm&mode=compose&u=4736"},
										this.createSpanTag({lang: "en", textContent: "DM on Francocube"}),
										this.createSpanTag({lang: "fr", textContent: "MP sur Francocube"})
									)
								)
							),
							this.createTrTag({},
								this.createTdTag({textContent: "GitHub"}),
								this.createTdTag({textContent: "Cubeur-manchot"}),
								this.createTdTag({},
									this.createATag({href: "https://github.com/Cubeur-manchot"},
										this.createSpanTag({lang: "en", textContent: "GitHub profile"}),
										this.createSpanTag({lang: "fr", textContent: "Profil GitHub"})
									)
								)
							),
							this.createTrTag({},
								this.createTdTag({textContent: "Gmail"}),
								this.createTdTag({textContent: "cubeurmanchot@gmail.com"}),
								this.createTdTag({textContent: "-"})
							),
							this.createTrTag({},
								this.createTdTag({textContent: "Instagram"}),
								this.createTdTag({textContent: "Matthieu Aubert (@cubeur_manchot)"}),
								this.createTdTag({},
									this.createATag({href: "https://www.instagram.com/cubeur_manchot/"},
										this.createSpanTag({lang: "en", textContent: "Instagram profile"}),
										this.createSpanTag({lang: "fr", textContent: "Profil Instagram"})
									)
								)
							),
							this.createTrTag({},
								this.createTdTag({textContent: "YouTube"}),
								this.createTdTag({textContent: "Matthieu Aubert (@MatthieuAubert)"}),
								this.createTdTag({},
									this.createATag({href: "https://www.youtube.com/@MatthieuAubert"},
										this.createSpanTag({lang: "en", textContent: "YouTube channel"}),
										this.createSpanTag({lang: "fr", textContent: "Chaîne YouTube"})
									)
								)
							)
						)
					)
				)
			)
		];
};

export {ContactView};
