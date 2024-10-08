"use strict";

import { Runner } from "https://cubeur-manchot.github.io/Holo-Cube/bundles/holo-cube-algorithm.node-bundle.js";

class HoloCubeService {
	static holoCubePuzzleNames = {
		"3x3": "cube3x3x3",
		"OH": "cube3x3x3",
		"big": "cube5x5x5"
	};
	constructor() {
		this.holoCubeRunner = null;
	};
	buildHoloCubeRunner = (puzzleName, mask, puzzleScale) => {
		this.holoCubeRunner = new Runner({
			puzzle: {
				fullName: puzzleName,
				colorScheme: ["yellow", "green", "orange", "white", "blue", "red"], // yellow top, green front
				mask: {
					stage: mask
				}
			},
			drawingOptions: {
				puzzleScale: puzzleScale
			},
			logger: {
				mode: "none"
			}
		});
	};
	createHoloCubeImage = alg => this.holoCubeRunner.run(this.reverseAlg(alg)).svg;
	reverseAlg = alg => alg.split(" ").map(move => move.endsWith("'") ? move.slice(0, -1) : `${move}'`).reverse().join(" ");
};

export {HoloCubeService};
