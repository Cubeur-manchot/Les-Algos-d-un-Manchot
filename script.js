"use strict";

import { CollectionView } from "./views/collectionView.js";
import { ContactView } from "./views/contactView.js";
import { HomeView } from "./views/homeView.js";
import { RecordsView } from "./views/recordsView.js";

const displayView = () => { // async ?
	let views = [HomeView, RecordsView, CollectionView, ContactView];
	let locationShort = location.pathname.replace(/^.*Manchot/i, "");
	let view = views.find(view => view.path == locationShort) ?? HomeView;
	new view().buildView();
	if (view === HomeView) {
		history.replaceState(null, null, location.pathname.replace(/\/(?!.*Manchot).*/, "/home")); // force home URL for home view
	}
};

const navigateTo = url => {
	history.pushState(null, null, url);
	displayView();
};

document.addEventListener("DOMContentLoaded", displayView);

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("input[type=checkbox]#isEnglish").checked = !navigator.language.includes("fr");
});

document.addEventListener("DOMContentLoaded", () => { // todo group into a single event listener
	for (let link of document.querySelectorAll("a.navLink")) {
		link.addEventListener("click", event => {
			console.log(event);
			event.preventDefault();
			navigateTo(event.target.href);
		});
	}
});
