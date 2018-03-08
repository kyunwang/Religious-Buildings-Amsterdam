'user strict';

import helpers from './helpers.js';

const storage = {
	buildingData: [],
	geojson: { type: 'FeatureCollection', features: [] },
	filterData(data) {
		console.log(data.results);
	},
	cleanData(data) {
		// Need to refactor this
		data.results.bindings = data.results.bindings.map(item => {
			// console.log(item);
			if (!item.coordinate_location) return item;


			item.buildYear = helpers.randomYear();
			item.demolishYear = helpers.randomYear(item.buildYear);

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
	allYears(data) {

	}
}

export default storage;