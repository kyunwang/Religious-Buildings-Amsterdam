'use strict';
import storage from './storage.js';
import helpers from './helpers.js';

import { MAPBOX_GL_TOKEN } from './secret.js';

const map = {
	imageCon: helpers.getElement('#image-con'),
	filterItems: ['synagogue', 'monastery', 'temple', 'church', 'mosque', 'shrine'],
	filterBtns: [],
	mapMarkers: [],

	initMapGoogle(data) {
		console.log('Google map init');

		const map = new google.maps.Map(helpers.getElement('#map'), {
			center: { lat: 52.3675, lng: 4.905278 },
			zoom: 8
		});

		data.results.bindings.forEach(item => {
			if (!item.coordinate_location) return;
			const lat = item.coordinate_location.value[1];
			const lng = item.coordinate_location.value[0];
			new google.maps.Marker({
				position: { lat, lng },
				map: map
			});
		})
	},
	initMap(data) {
		mapboxgl.accessToken = MAPBOX_GL_TOKEN;

		var myMap = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/light-v9',
			// center: [52.3675, 4.905278],
			center: [4.905278, 52.3675],
			zoom: 14,
			pitch: 45,
			bearing: -17.6,
			hash: true,
		});

		console.log(storage.geojson);


		// Map the locations on the map
		data.results.bindings.forEach(item => {
			if (!item.coordinate_location) return;
			// const lat = item.coordinate_location.value[1];
			// const lng = item.coordinate_location.value[0];

			const buildingKeys = Object.keys(item);
			const foundKey = buildingKeys.filter(key => {
				if (this.filterItems.includes(key)) return true;
				return false;
			})

			// console.log(item);




			// create a HTML element for each feature
			var el = document.createElement('div');
			el.classList.add('marker', `marker-${foundKey}`);
			// el.className = `marker-${foundKey}`;
			// el.addEventListener('click', )

			// make a marker for each feature and add to the map

			const marker = new mapboxgl.Marker(el)
				.setLngLat(item.coordinate_location.value.geometry.coordinates)
				.addTo(myMap);

			marker.options = item;

			// console.log(marker);


			map.mapMarkers.push(marker); // 

		});

		console.log(this.mapMarkers);



		// The 'building' layer in the mapbox-streets vector source contains building-height
		// data from OpenStreetMap.
		myMap.on('load', function () {
			// Insert the layer beneath any symbol layer.
			var layers = myMap.getStyle().layers;

			var labelLayerId;
			for (var i = 0; i < layers.length; i++) {
				if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
					labelLayerId = layers[i].id;
					break;
				}
			}

			myMap.addLayer({
				'id': '3d-buildings',
				'source': 'composite',
				'source-layer': 'building',
				'filter': ['==', 'extrude', 'true'],
				'type': 'fill-extrusion',
				'minzoom': 15,
				'paint': {
					'fill-extrusion-color': '#aaa',

					// use an 'interpolate' expression to add a smooth transition effect to the
					// buildings as the user zooms in
					'fill-extrusion-height': [
						"interpolate", ["linear"], ["zoom"],
						15, 0,
						15.2, ["get", "height"]
					],
					'fill-extrusion-base': [
						"interpolate", ["linear"], ["zoom"],
						15, 0,
						15.2, ["get", "min_height"]
					],
					'fill-extrusion-opacity': .6
				}
			}, labelLayerId);
		});

	},

	refreshMap() {
		console.log('Refresh map');

		let activeFilters = [];

		// Gettin the active filters
		this.filterBtns.forEach(filterNode => {
			if (filterNode.checked) {
				activeFilters.push(filterNode.name);
			}
		})

		// Display * Hide marker logic
		this.mapMarkers.forEach(item => {
			// Getting all the keys of an item to compare with
			const buildingKeys = Object.keys(item.options);

			// Thanks to this mate: https://stackoverflow.com/a/39893636/8525996
			// Checks whether a array contains a same array item from another array
			const foundKeys = buildingKeys.some(key => activeFilters.includes(key))

			if (foundKeys) {
				item._element.classList.remove('hide');
			} else {
				item._element.classList.add('hide');
			}
		})
	}
}

export default map;