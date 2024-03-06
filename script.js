console.log("script loaded !");

const router = () => { // async ?
	let routes = [
		{path: "/", view: viewDashboard},
		{path: "/posts", view: viewPosts},
		{path: "/settings", view: viewSettings},
	];
	let locationShort = location.pathname.replace(/^.*Manchot\/Test.*SPA/i, "");
	console.log(locationShort)
	let view = routes.find(route => route.path === locationShort)?.view ?? viewDashboard;
	console.log("view")
	console.log(view)
};

const viewDashboard = () => {
	console.log("viewDashboard")
};

const viewPosts = () => {
	console.log("viewPosts")
};

const viewSettings = () => {
	console.log("viewSettings")
};

const navigateTo = url => {
	console.log("navigate to :")
	console.log(url)
	history.pushState(null, null, url);
	router();
};

document.addEventListener("DOMContentLoaded", router);

document.addEventListener("DOMContentLoaded", () => {
	for (let link of document.querySelectorAll("a.navLink")) {
		link.addEventListener("click", event => {
			console.log(event);
			event.preventDefault();
			navigateTo(event.target.href);
		});
	}
});

