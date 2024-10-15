"use strict";

import { AlgsetView } from "./views/algsetView.js";
import { CollectionView } from "./views/collectionView.js";
import { ContactView } from "./views/contactView.js";
import { HomeView } from "./views/homeView.js";
import { RecordsView } from "./views/recordsView.js";
import { DataService } from "./services/dataService.js";

const displayView = () => {
	let views = [HomeView, RecordsView, CollectionView, ContactView, AlgsetView];
	let [locationShort, ...restOfThePath] =
		(
			new URLSearchParams(location.search).get("redirect") // if a redirection is provided (coming from 404.html), use it
			?? location.pathname.replace(window.urlPrefix, "") // otherwise use standard path after website name
		)
		.split(/(?=\/)/); // split by /
	let view = views.find(view => view.path == locationShort) ?? HomeView;
	new view(restOfThePath).buildView();
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

const setupNavigationLinks = () => {
	// simple event listener for immutable header
	document.querySelector("header a#siteTitle").addEventListener("click", handleNavigationClick);
	// mutation observer for mutable main
	new MutationObserver(
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
}

const setupUrlPrefix = () => window.urlPrefix = location.pathname.match(/^\/Les-Algos-d-un-Manchot/i)?.[0] ?? ""; // "/Les-Algos-d-un-Manchot" for deployed version, "" for local version

const selectLanguageFromBrowserSettings = () => document.querySelector("input[type=checkbox]#isEnglish").checked = !navigator.language.includes("fr");

const setupDataService = () => window.dataService = new DataService();

window.addEventListener("popstate", displayView); // back and forth navigation in history

document.addEventListener("DOMContentLoaded", setupUrlPrefix);
document.addEventListener("DOMContentLoaded", setupNavigationLinks); // permanent event listener for navigation
document.addEventListener("DOMContentLoaded", setupDataService);
document.addEventListener("DOMContentLoaded", displayView); // initial loading of the page
document.addEventListener("DOMContentLoaded", selectLanguageFromBrowserSettings);
