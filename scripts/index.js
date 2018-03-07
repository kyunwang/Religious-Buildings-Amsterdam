'use strict';

import api from './api.js';
import map from './map.js';
import storage from './storage.js'

(function () {
	const app = {
		header: document.getElementById('header'),
		filterItems: ['synagogue', 'monastery', 'temple', 'church', 'mosque', 'shrine'],
		activeFilterItems: ['synagogue', 'monastery', 'temple', 'church', 'mosque', 'shrine'],

		init() {
			api.init()
				.then( async res => {
					// console.log(res.results.bindings);
					storage.buildingData = res;
					await this.assignFilterBtns(); // Assing and create the buttons first
					map.filterBtns = document.querySelectorAll('.filter-btn'); // Then get them for later use
					return res;
				}).then(res => {
					// map.initMapLeaflet(res);
					map.initMapLeaflet(storage.buildingData);
				})
		},

		assignFilterBtns(data) {
			this.filterItems.forEach(item => {
				// They are checkboxes thou
				let filterBtn = document.createElement('input');
				let filterBtnLabel = document.createElement('label');

				filterBtnLabel.htmlFor = `button-${item}`;
				filterBtnLabel.textContent = `button-${item}`;

				filterBtn.type = 'checkbox';
				filterBtn.id = `button-${item}`;
				filterBtn.className = 'filter-btn';
				filterBtn.value = item;
				filterBtn.name = item;
				filterBtn.checked = true;
				filterBtn.textContent = item;
				
				filterBtn.addEventListener('change', this.refreshMap(item))

				app.header.appendChild(filterBtn);
				app.header.appendChild(filterBtnLabel);
			})
		},

		refreshMap(data) {
			// A Closure making use of Currying ^^
			return function() {
				// console.log('refreshMap', data, storage.buildingData);
				map.refreshMap();
			}
		}
	}

	app.init();
})()

