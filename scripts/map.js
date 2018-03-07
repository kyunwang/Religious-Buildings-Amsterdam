'use strict';

import storage from './storage.js';
import helpers from './helpers.js';

const map = {
	imageCon: helpers.getElement('#image-con'),
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
	initMapLeaflet(data) {
		var mymap = L.map('map')
			.setView([52.3675, 4.905278], 13);

		// L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png', {
		L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
		// L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
			// L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
			maxZoom: 15,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
			// id: 'CartoDB.DarkMatterNoLabels',
			id: 'Thunderforest.Pioneer',
			maxZoom: 15
		}).addTo(mymap);


		// Map the locations on the map
		data.results.bindings.forEach(item => {
			if (!item.coordinate_location) return;
			const lat = item.coordinate_location.value[1];
			const lng = item.coordinate_location.value[0];

			const marker = L.marker([lat, lng], { ...item, })
				.addTo(mymap)
				.on('click', function (e) {
					const data = e.target.options;

					if (data.image) {
						map.imageCon.classList.toggle('show');

						// console.log(data);
						let img = helpers.createElement('img');
						img.src = data.image.value;
						img.title = data.image.value;
						// console.log(img);
						
						map.imageCon.appendChild(img);
					}
			})

			this.mapMarkers.push(marker); // 
			
		})

	},

	refreshMap() {
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
				// Leaflet method
				L.DomUtil.removeClass(item._icon, 'hide')
			} else {
				L.DomUtil.addClass(item._icon, 'hide')
			}
		})
	}
}

export default map;