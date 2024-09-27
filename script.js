"use strict";

import { AlgsetView } from "./views/algsetView.js";
import { CollectionView } from "./views/collectionView.js";
import { ContactView } from "./views/contactView.js";
import { HomeView } from "./views/homeView.js";
import { RecordsView } from "./views/recordsView.js";
import { DataService } from "./services/dataService.js";

const displayView = () => {
	let views = [HomeView, RecordsView, CollectionView, ContactView, AlgsetView];
	let [locationShort, ...restOfThePath] = location.pathname.replace(/^.*Manchot/i, "").split(/(?=\/)/);
	let view = views.find(view => view.path == locationShort) ?? HomeView;
	new view(restOfThePath).buildView();
	if (view === HomeView) {
		history.replaceState(null, null, location.pathname.replace(/\/(?!.*Manchot).*/, "/home")); // force home URL for home view
	}
};

const navigateTo = url => {
	history.pushState(null, null, url);
	displayView();
};

const handleNavigationClick = event => {
	let internalNavigationLink = event.target.closest("a.internalNavigation");
	if (internalNavigationLink) {
		event.preventDefault();
		navigateTo(internalNavigationLink.href);
	}
};

const setupNavigationLinks = () => new MutationObserver(
	mutationRecords =>
		mutationRecords
		.filter(mutationRecord => mutationRecord.type === "childList")
		.forEach(childListMutationRecord =>
			Array.from(childListMutationRecord.addedNodes)
			.filter(addedNode => addedNode.localName === "nav")
			.forEach(navAddedNode =>
				navAddedNode.addEventListener("click", handleNavigationClick)
			)
		)
	)
	.observe(document.querySelector("main"), {childList: true});

const selectLanguageFromBrowserSettings = () => document.querySelector("input[type=checkbox]#isEnglish").checked = !navigator.language.includes("fr");

const setupDataService = () => window.dataService = new DataService();

window.addEventListener("popstate", displayView); // back and forth navigation in history

document.addEventListener("DOMContentLoaded", setupNavigationLinks); // permanent event listener for navigation
document.addEventListener("DOMContentLoaded", setupDataService);
document.addEventListener("DOMContentLoaded", displayView); // initial loading of the page
document.addEventListener("DOMContentLoaded", selectLanguageFromBrowserSettings);
