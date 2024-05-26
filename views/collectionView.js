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
			this.createTableTag({id: "collection"},
				this.createTheadTag({},
					...CollectionView.fields.map(field => this.createThTag({lang: "en", textContent: field.en})),
					...CollectionView.fields.map(field => this.createThTag({lang: "fr", textContent: field.fr})),
					this.createInputTag({id: "collectionTableSettingsButton", type:"checkbox", className: "icon"})
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
				),
				this.createDialogTag({id: "collectionTableSettings"},
					...CollectionView.fields.map(field =>
						[
							this.createInputTag({type: "checkbox", id: `${field.id}DisplayToggler`, className: "displayToggler", checked: field.default}),
							this.createLabelTag({lang: "en", className: "displayTogglerLabel", htmlFor: `${field.id}DisplayToggler`, textContent: field.en}),
							this.createLabelTag({lang: "fr", className: "displayTogglerLabel", htmlFor: `${field.id}DisplayToggler`, textContent: field.fr})
						]
					).flat()
				),
				this.createLabelTag({id: "collectionTableSettingsDialogBackdrop", htmlFor: "collectionTableSettingsButton"})
			)
		];
	};
};

export {CollectionView};
