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
		const markers = helpers.getElements('.leaflet-marker-icon');
		console.log('Refresh map');
		console.log(this.filterBtns, this.mapMarkers);
		// console.log(this.filterBtns);

		let me = [];

		this.filterBtns.forEach(filterNode => {
			if (filterNode.checked) {
				me.push(filterNode.name);
			}
		})

		console.log('list:' ,me);
		
		
		// const filteredData = this.mapMarkers.filter(item => {
		this.mapMarkers.forEach(item => {
			// console.log(item.options);
			const keys = Object.keys(item.options)
			let found = keys.some(r => me.includes(r))

			if (found) {
				// item.classList.remove('hide');
				item.removeClass('hide');
				return true;
			}
			
			item.addClass('hide');
			// item.classList.add('hide');
			return false;
		})

		

		

		// storage.buildingData.results.bindings
	}
}

export default map;