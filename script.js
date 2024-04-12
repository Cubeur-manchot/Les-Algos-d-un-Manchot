import { HomeView } from "./views/homeView.js";

console.log("script loaded !");

const displayView = () => { // async ?
	let routes = [
		{path: "/home", view: HomeView},
	];
	let locationShort = location.pathname.replace(/^.*Manchot/i, "");
	let view = new (routes.find(route => route.path === locationShort)?.view ?? HomeView)();
	view.buildView();
	if (view instanceof HomeView) {
		history.replaceState(null, null, location.pathname.replace(/\/(?!.*Manchot).*/, "/home")); // force home URL for home view
	}
};

const navigateTo = url => {
	history.pushState(null, null, url);
	displayView();
};

document.addEventListener("DOMContentLoaded", displayView);

document.addEventListener("DOMContentLoaded", () => { // todo group into a single event listener
	for (let link of document.querySelectorAll("a.navLink")) {
		link.addEventListener("click", event => {
			console.log(event);
			event.preventDefault();
			navigateTo(event.target.href);
		});
	}
});

