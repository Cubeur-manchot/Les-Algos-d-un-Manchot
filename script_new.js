"use strict";

function loadXml() // load algs.xml and store it in window.xml3x3algs
{
	let xmlHttp;
	if(window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject("Microsoft.xmlHttp");
	}
	xmlHttp.open("get", "algs.xml", false);
	xmlHttp.send();
	window.xmlalgs = document.querySelector("xml");
	console.log(window.xmlalgs);
}

function generatePage(setName) // generates the page corresponding to the chosen set
{
	let algZoneHtmlTag = createHtmlTagWithId("section", "algZone");
	console.log(window.xmlalgs);
	for (let set of window.xmlalgs.querySelector("sets").querySelectorAll("set")) {
		if (set.getAttribute("name") === setName) {
			let options = set.getAttribute("options");
			let pzl = set.getAttribute("pzl");
			let useAlternativeName = set.getAttribute("useAlternativeName") === "true";
			if (options === null) {
				options = "";
			}
			let caseList = set.getAttribute("caseList");
			if (caseList === null) { // look for subsets
				for (let subset of set.querySelectorAll("subset")) {
					algZoneHtmlTag.appendChild(createHtmlTagWithTextContent("h2", subset.getAttribute("name")));
					algZoneHtmlTag.appendChild(generatePageForSetsOrSubsets(subset, useAlternativeName, options, pzl));
				}
			} else {
				algZoneHtmlTag.appendChild(generatePageForSetsOrSubsets(set, useAlternativeName, options, pzl));
			}
			document.querySelector("h1").insertAdjacentElement("afterend", algZoneHtmlTag);
			return;
		}
	}
}

function generatePageForSetsOrSubsets(setOrSubset, useAlternativeName, options, pzl)
{
	let ulHtmlTag = createHtmlTagWithClassName("ul", "liste_cas_simple");
	let keepAUF = setOrSubset.getAttribute("keepAUF");
	for (let algCase of setOrSubset.getAttribute("caseList").split(" ")) {
		for (let alg of window.xmlalgs.querySelector("algs").querySelectorAll("alg")) {
			if (alg.getAttribute("id") === algCase) {
				ulHtmlTag.appendChild(makeAlgCard(alg, keepAUF, useAlternativeName, options, pzl));
				break;
			}
		}
	}
	return ulHtmlTag;
}

function makeAlgCard(alg, keepAUF, useAlternativeName, options, pzl)
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
	let moveSequenceForImage = moveSequence;
	if (pzl === "5") { // replace wide moves
		moveSequenceForImage = moveSequenceForImage
			.replace(/r/g,"4Rw")
			.replace(/l/g, "4Lw")
			.replace(/M /g, "4Lw L' ")
			.replace(/M$/g, "4Lw L'")
			.replace(/M'/g, "4Lw' L")
			.replace(/M2'?/g, "4Lw2 L2");
	} else {
		pzl = "3";
	}
	let aHtmlTag = createHtmlTagWithClassNameHrefAndTextContent("a", "bouton_animation",
		"http://alg.cubing.net/?puzzle=3x3x3&alg=" + moveSequence + "&setup=z2 (" + moveSequence + ")'");
	aHtmlTag.title = "Animation";
	aHtmlTag.target = "_blank";
	let imgHtmlTag = createHtmlTag("img");
	imgHtmlTag.src = "http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&bg=white&pzl=" + pzl
		+ "&case=" + moveSequenceForImage + options;
	aHtmlTag.appendChild(imgHtmlTag);
	liHtmlTag.appendChild(aHtmlTag);
	if (moveSequence.length > 26) {
		liHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "algo long", moveSequence));
	} else {
		liHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "algo", moveSequence));
	}
	return liHtmlTag;
}