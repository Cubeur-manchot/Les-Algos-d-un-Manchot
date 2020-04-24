"use strict";

function loadXml() // load 3x3Algs.xml and store it in window.xml3x3Algs
{
	let xmlHttp;
	if(window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject("Microsoft.xmlHttp");
	}
	xmlHttp.open("get", "3x3Algs.xml", false);
	xmlHttp.send();
	window.xml3x3Algs = xmlHttp.responseXML.querySelector("xml");
}

function generatePage(setName) // generates the page corresponding to the chosen set
{
	let ulHtmlTag = document.querySelector("ul.liste_cas_simple");
	for (let set of window.xml3x3Algs.querySelector("sets").querySelectorAll("set")) {
		if (set.getAttribute("name") === setName) {
			for (let algCase of set.getAttribute("caseList").split(" ")) {
				for (let alg of window.xml3x3Algs.querySelector("algs").querySelectorAll("alg")) {
					if (alg.getAttribute("id") === algCase) {
						ulHtmlTag.appendChild(makeAlgCard(alg));
						break;
					}
				}
			}
			return;
		}
	}
}

function makeAlgCard(alg)
{
	let liHtmlTag = createHtmlTagWithClassName("li", "cas");
	liHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "nom", alg.getAttribute("name")));
	let moveSequence = alg.getAttribute("sequence");
	let aHtmlTag = createHtmlTagWithClassNameHrefAndTextContent("a", "bouton_animation",
		"http://alg.cubing.net/?puzzle=3x3x3&alg=" + moveSequence + "&setup=z2 (" + moveSequence + ")'");
	aHtmlTag.title = "Animation";
	aHtmlTag.target = "_blank";
	let imgHtmlTag = createHtmlTag("img");
	imgHtmlTag.src = "http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&view=plan&bg=white&pzl=3&case=" + moveSequence;
	aHtmlTag.appendChild(imgHtmlTag);
	liHtmlTag.appendChild(aHtmlTag);
	if (moveSequence.length > 26) {
		liHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "algo long", moveSequence));
	} else {
		liHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "algo", moveSequence));
	}
	return liHtmlTag;
}