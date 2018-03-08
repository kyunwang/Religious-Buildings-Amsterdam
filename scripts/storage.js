'user strict';

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

			// console.log(item);

			// Clean and create usable coordinates
			let coords = item.coordinate_location.value
				.split(' ')

			coords = coords.map((item, i) => {
				return Number(item.replace(/[^0-9\.]+/g, ""));
			})

			item.coordinate_location.value = {
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

			this.geojson.features.push({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: coords
				},
				properties: {
					title: 'Mapbox',
					description: 'Washington, D.C.',
				}
			});

			return item;
		});
		return data;
	}
	// cleanData(data) {
	// 	data.results.bindings = data.results.bindings.map(item => {
	// 		// console.log(item);
	// 		if (!item.coordinate_location) return item;

	// 		// console.log(item);

	// 		// Clean and create usable coordinates
	// 		let coords = item.coordinate_location.value
	// 			.split(' ')

	// 			coords = coords.map((item, i) => {
	// 				return Number(item.replace(/[^0-9\.]+/g, ""));
	// 			})

	// 			item.coordinate_location.value = coords;

	// 			return item;
	// 	});
	// 	return data;
	// }
}

export default storage;