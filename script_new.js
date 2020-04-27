"use strict";

function loadXml() // load 3x3algs.xml and store it in window.xml3x3algs
{
	let xmlHttp;
	if(window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject("Microsoft.xmlHttp");
	}
	xmlHttp.open("get", "3x3algs.xml", false);
	xmlHttp.send();
	window.xml3x3algs = xmlHttp.responseXML.querySelector("xml");
}

function generatePage(setName) // generates the page corresponding to the chosen set
{
	let algZoneHtmlTag = createHtmlTagWithId("section", "algZone");
	for (let set of window.xml3x3algs.querySelector("sets").querySelectorAll("set")) {
		if (set.getAttribute("name") === setName) {
			let options = set.getAttribute("options");
			let useAlternativeName = set.getAttribute("useAlternativeName") === "true";
			if (options === null) {
				options = "";
			}
			let caseList = set.getAttribute("caseList");
			if (caseList === null) { // look for subsets
				for (let subset of set.querySelectorAll("subset")) {
					algZoneHtmlTag.appendChild(createHtmlTagWithTextContent("h2", subset.getAttribute("name")));
					algZoneHtmlTag.appendChild(generatePageForSetsOrSubsets(subset, useAlternativeName, options));
				}
			} else {
				algZoneHtmlTag.appendChild(generatePageForSetsOrSubsets(set, useAlternativeName, options));
			}
			document.querySelector("h1").insertAdjacentElement("afterend", algZoneHtmlTag);
			return;
		}
	}
}

function generatePageForSetsOrSubsets(setOrSubset, useAlternativeName, options)
{
	let ulHtmlTag = createHtmlTagWithClassName("ul", "liste_cas_simple");
	let keepAUF = setOrSubset.getAttribute("keepAUF");
	for (let algCase of setOrSubset.getAttribute("caseList").split(" ")) {
		for (let alg of window.xml3x3algs.querySelector("algs").querySelectorAll("alg")) {
			if (alg.getAttribute("id") === algCase) {
				ulHtmlTag.appendChild(makeAlgCard(alg, keepAUF, useAlternativeName, options));
				break;
			}
		}
	}
	return ulHtmlTag;
}

function makeAlgCard(alg, keepAUF, useAlternativeName, options)
{
	let liHtmlTag = createHtmlTagWithClassName("li", "cas");
	let name = alg.getAttribute("name");
	if (useAlternativeName && alg.getAttribute("alternativeName") !== null) {
		name = alg.getAttribute("alternativeName");
	}
	liHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "nom", name));
	let moveSequence = alg.getAttribute("sequence");
	if (keepAUF !== "true") {
		moveSequence = moveSequence.replace(/ \(U.*\)/,""); // remove things in parenthesis
	}
	let aHtmlTag = createHtmlTagWithClassNameHrefAndTextContent("a", "bouton_animation",
		"http://alg.cubing.net/?puzzle=3x3x3&alg=" + moveSequence + "&setup=z2 (" + moveSequence + ")'");
	aHtmlTag.title = "Animation";
	aHtmlTag.target = "_blank";
	let imgHtmlTag = createHtmlTag("img");
	imgHtmlTag.src = "http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&bg=white&pzl=3&case=" + moveSequence + options;
	aHtmlTag.appendChild(imgHtmlTag);
	liHtmlTag.appendChild(aHtmlTag);
	if (moveSequence.length > 26) {
		liHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "algo long", moveSequence));
	} else {
		liHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "algo", moveSequence));
	}
	return liHtmlTag;
}