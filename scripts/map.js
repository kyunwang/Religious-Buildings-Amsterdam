'use strict';
import storage from './storage.js';
import helpers from './helpers.js';

const map = {
	// imageCon: helpers.getElement('#image-con'),
	// imageCon: helpers.getElement('aside'),
	imageCon: helpers.getElement('#map'),
	imageConAside: helpers.getElement('aside > header'),
	imageConDiv: helpers.getElement('aside > div'),
	imageConClose: helpers.getElement('aside > button'),
	filterItems: [],
	filterCheckboxes: [],
	mapMarkers: [],
	initMap(data) {
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

		this.imageConClose.addEventListener('click', this.closeDetail);

		// Map the locations on the map
		data.results.bindings.forEach(item => {
			if (!item.coordinate_location) return;

			// 
			const buildingKeys = Object.keys(item);
			const foundKey = buildingKeys.filter(key => {
				if (this.filterItems.includes(key)) return true;
				return false;
			})


			// create a HTML element for each feature
			// const markerCon = document.createElement('object');
			// markerCon.data = storage.images[`${item.type.value}`]
			// markerCon.type = 'image/svg+xml';
			// markerCon.classList.add('marker', `marker-${item.type.value}`);

			
			const markerCon = document.createElement('div');
			markerCon.classList.add('marker', `marker-${item.type.value}`);


			// el.className = `marker-${foundKey}`;

			// make a marker for each feature and add to the map

			const marker = new mapboxgl.Marker(markerCon)
				.setLngLat(item.coordinate_location.value.geometry.coordinates)
				.addTo(myMap);

			marker.options = item;


			markerCon.addEventListener('click', function () {
				map.toggleDetail(marker);
			});

			map.mapMarkers.push(marker); // 
		});


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

	refreshFilterMap() {
		console.log('Refresh filter map');

		let activeFilters = [];

		// Gettin the active filters
		map.filterCheckboxes.forEach(filterNode => {
			if (filterNode.checked) {
				activeFilters.push(filterNode.name);
			}
		});

		// Display * Hide marker logic
		map.mapMarkers.forEach(item => {
			// Thanks to this mate: https://stackoverflow.com/a/39893636/8525996
			// Checks whether a array contains a same array item from another array
			const foundKeys = activeFilters.includes(item.options.type.value)

			if (foundKeys) {
				item._element.classList.remove('hide-filter');
			} else {
				item._element.classList.add('hide-filter');
			}
		})
	},
	refreshYearMap(label) {
		return function (e) {
			console.log('Refresh year map');
			const selectedYear = e.target.value;

			label.textContent = `Building in year: ${selectedYear}`;

			map.mapMarkers.forEach(item => {
				if (item.options.buildYear <= selectedYear) {
					item._element.classList.remove('hide-year');
				} else {
					item._element.classList.add('hide-year');
				}
			})
		}


	},
	toggleDetail(marker) {
		const data = marker.options;

		console.log(data);
		
		map.addBuildingInfo(data);

		if (data.image) {
			map.addBuildingImage(data);
		}
	},
	addBuildingInfo(data) {
		map.imageConAside.innerHTML = '';
		
		let buildingInfoCon = helpers.createElement('div');
		let buildingName = helpers.createElement('h2');
		buildingName.textContent = data.itemLabel.value;

		let buildingBuildYear = helpers.createElement('p'); buildingBuildYear.textContent = `Build year: ${data.buildYear}`;

		let buildingBuildDemolish = helpers.createElement('p');
		buildingBuildDemolish.textContent =`Demolish year: ${data.demolishYear || 'still standing'}`;

		// From https://stackoverflow.com/a/36798273/8525996
		buildingInfoCon.innerHTML += buildingName.outerHTML + buildingBuildYear.outerHTML + buildingBuildDemolish.outerHTML;

		// Add the header with building info
		map.imageConAside.insertAdjacentElement('afterbegin', buildingInfoCon);
	},
	addBuildingImage(data) {
		map.imageConDiv.innerHTML = ''; // Quick hacky way to clear the children ( time mann 😢)
		map.imageCon.classList.toggle('show');

		data.image.value.forEach(image => {
			let img = helpers.createElement('img');
			img.src = image;
			img.title = image;

			map.imageConDiv.appendChild(img);
		})
	},
	closeDetail() {
		map.imageCon.classList.remove('show');
		map.imageConDiv.innerHTML = ''; // Quick hacky way to clear the children ( time mann 😢)
	}
}

export default map;