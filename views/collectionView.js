"use strict";

import { View } from "./view.js";

class CollectionView extends View {
	static path = "/collection";
	static title = "Collection";
	static colors = {
		black: {
			en: "Black",
			fr: "Noir"
		},
		white: {
			en: "White",
			fr: "Blanc"
		},
		transparent: {
			en: "Transparent",
			fr: "Transparent"
		}
	};
	static fields = [
		{id: "model", en: "Model", fr: "Modèle", default: true},
		{id: "brand", en: "Brand", fr: "Marque", default: true},
		{id: "color", en: "Color", fr: "Couleur", default: true},
		{id: "main", en: "Main", fr: "Main", default: true},
		{id: "type", en: "Type", fr: "Type", default: false},
		{id: "faces", en: "Faces", fr: "Faces", default: false},
		{id: "layers", en: "Layers", fr: "Tranches", default: false},
		{id: "acquisitionDate", en: "Acquisition date", fr: "Date d'acquisition", default: false},
		{id: "meansOfAcquisition", en: "Means of acquisition", fr: "Moyen d'acquisition", default: false},
		{id: "price", en: "Price", fr: "Prix", default: false}
	];
	constructor() {
		super();
	};
	getContent = async () => {
		let collection = await fetch("../data/collection.json") // todo add the end (ZiiCube, CubeZZ, PiCubeShop, Axel, gifts, prices)
			.then(response => response.json())
			.then(collection => collection.filter(collectionItem => collectionItem.puzzle)); // keep puzzles only
		return [
			this.createH1Tag({textContent: "Collection"}),
			this.createDivTag({className: "table-container"},
				this.createTableTag({id: "collection", className: "table-custom-columns"},
					this.createInputTag({id: "collection-table-settings-button", className: "table-settings-button", type: "checkbox"}),
					this.createDialogTag({className: "table-settings"},
						...CollectionView.fields.map(field =>
							[
								this.createInputTag({type: "checkbox", id: `${field.id}-display-toggler`, className: "display-toggler", checked: field.default}),
								...["en", "fr"].map(language =>
									this.createLabelTag({lang: language, className: "display-toggler-label", htmlFor: `${field.id}-display-toggler`, textContent: field[language]})
								)
							]
						).flat()
					),
					this.createLabelTag({className: "table-settings-backdrop", htmlFor: "collection-table-settings-button"}),
					this.createTheadTag({},
						...["en", "fr"].map(language =>
							CollectionView.fields.map(field => this.createThTag({lang: language, textContent: field[language]}))
						).flat()
					),
					this.createTbodyTag({},
						...collection.map(collectionItem =>
							this.createTrTag({},
								this.createTdTag({textContent: collectionItem.puzzle.model ?? "-"}),
								this.createTdTag({textContent: collectionItem.puzzle.brand ?? "-"}),
								this.createTdTag({lang: "en", textContent: collectionItem.puzzle.stickerless
									? "Stickerless"
									: CollectionView.colors[collectionItem.puzzle.plastic].en}),
								this.createTdTag({lang: "fr", textContent: collectionItem.puzzle.stickerless
									? "Stickerless"
									: CollectionView.colors[collectionItem.puzzle.plastic].fr}),
								this.createTdTag({lang: "en", textContent: collectionItem.puzzle.main ? "Yes" : "No"}),
								this.createTdTag({lang: "fr", textContent: collectionItem.puzzle.main ? "Oui" : "Non"}),
								this.createTdTag({textContent: collectionItem.puzzle.characteristics.type ?? "-"}),
								this.createTdTag({textContent: collectionItem.puzzle.characteristics.faces}),
								this.createTdTag({textContent: collectionItem.puzzle.characteristics.layers}),
								this.createTdTag({textContent: collectionItem.acquisition.date}),
								this.createTdTag({textContent: collectionItem.acquisition.website}), // todo refine (non-website acquisitions)
								this.createTdTag({textContent: `${collectionItem.acquisition.price.toFixed(2)} ${collectionItem.acquisition.currency}`})
							)
						)
					)
				)
			)
		];
	};
};

export {CollectionView};
