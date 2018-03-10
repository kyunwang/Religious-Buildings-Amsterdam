'use strict';

import helpers from './helpers.js';

const storage = {
	images: {
		synagogue: '../static/images/svg/001-synagogue.svg',
		shrine: '../static/images/svg/002-shrine.svg',
		mosque: '../static/images/svg/003-mosque.svg',
		monastery: '../static/images/svg/004-monastery.svg',
		church: '../static/images/svg/005-church.svg',
		temple: '../static/images/svg/006-temple.svg',
	},
	buildingData: [],
	geojson: { type: 'FeatureCollection', features: [] },
	filterData(data) {
		console.log(data.results);
	},
	cleanData(data) {
		// Need to refactor this
		data.results.bindings = data.results.bindings.map(item => {
			item.buildYear = helpers.randomYear();
			item.demolishYear = helpers.randomYear(item.buildYear);

			if (!item.coordinate_location) return item;

			// Clean and create usable coordinates
			let coords = item.coordinate_location.value
				.split(' ')

			coords = coords.map((item, i) => {
				return Number(item.replace(/[^0-9\.]+/g, ""));
			})

			const geo_Template = {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: coords
				},
				properties: {
					title: 'Mapbox',
					description: 'Washington, D.C.',
				}
			};

			item.coordinate_location.value = geo_Template;


			this.geojson.features.push(geo_Template);

			return item;
		});
		return data;
	},
	groupItems(dataArray) {
		// Thanks to https://stackoverflow.com/a/33850667/8525996
		const output = [];

		dataArray.forEach(function (value) {
			const existing = output.filter(function (v, i) {
				if (value.itemLabel && v.itemLabel) {
					return v.itemLabel.value == value.itemLabel.value;
				}
				return false;
			});

			if (value.image) {
				if (existing.length) {
					const existingIndex = output.indexOf(existing[0]);
					output[existingIndex].image.value = output[existingIndex].image.value.concat(value.image.value);
				} else {
					if (typeof value.itemLabel.value == 'string') {
						value.image.value = [value.image.value];
					}
					output.push(value);
				}
			}
		});

		this.buildingData.results.bindings = output;
	},
}

export default storage;