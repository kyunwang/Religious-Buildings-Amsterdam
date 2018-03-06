'use strict';

import api from './api.js';
import storage from './storage.js'

(function() {
	const app = {
		data: [],
		googleMap: document.getElementById('map'),
		init() {
			api.init()
				.then(res => {
					console.log(res.results.bindings);
					
					// console.log(res.results.bindings[0].coordinate_location.value);
					// console.log(11, res.results.bindings[0]);
					this.initMap(res);
				});
		},
		initMap(data) {
			console.log('mapping');
			
			const map = new google.maps.Map(document.getElementById('map'), {
			  center: {lat: 52.3675, lng: 4.905278},
			  zoom: 8
			});

			data.results.bindings.forEach(item => {
				if (!item.coordinate_location) return;
				const lat = item.coordinate_location.value[1];
				const lng = item.coordinate_location.value[0];
				new google.maps.Marker({
					position: {lat, lng},
					map: map
				 });
			})
		 }
	}

	app.init();
})()

