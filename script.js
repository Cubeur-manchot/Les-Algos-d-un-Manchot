"use strict";

import { CollectionView } from "./views/collectionView.js";
import { ContactView } from "./views/contactView.js";
import { HomeView } from "./views/homeView.js";
import { RecordsView } from "./views/recordsView.js";

	let views = [HomeView, RecordsView, CollectionView, ContactView];
const displayView = () => {
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

const handleNavigationClick = event => {
	let aTag = event.target.closest("a.navigationCard");
	if (aTag) {
		event.preventDefault();
		navigateTo(aTag.href);
	}
};

const setupNavigationLinks = () => {
	for (let nav of document.querySelectorAll("nav")) {
		nav.removeEventListener("click", handleNavigationClick);
		nav.addEventListener("click", handleNavigationClick);
	}
};

const selectLanguageFromBrowserSettings = () => document.querySelector("input[type=checkbox]#isEnglish").checked = !navigator.language.includes("fr");

window.addEventListener("popstate", displayView); // back and forth navigation in history
document.addEventListener("DOMContentLoaded", displayView); // initial loading of the page
document.addEventListener("DOMContentLoaded", setupNavigationLinks);
document.addEventListener("DOMContentLoaded", selectLanguageFromBrowserSettings);
