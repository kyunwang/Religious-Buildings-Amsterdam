'use strict';

import api from './api.js';
import map from './map.js';
import storage from './storage.js';
import helpers from './helpers.js';

(function () {
	const app = {
		header: helpers.getElement('#header'),
		init() {
			api.init()
				.then( async res => {
					// console.log(res.results.bindings);
					storage.buildingData = res;
					await this.assignFilterBtns(); // Assing and create the buttons first
					map.filterBtns = helpers.getElements('.filter-btn'); // Then get them for later use
					// return res;
				}).then(() => {
					// console.log(1,storage.buildingData.results.bindings.length);
					
					// const test = helpers.groupItems(storage.buildingData.results.bindings, function(item) {
					// 	// console.log(...item);
					// 	// return []
					// })

					// console.log(test);
					
					// map.initMapLeaflet(res);
					map.initMap(storage.buildingData);
				})
		},

		assignFilterBtns(data) {
			map.filterItems.forEach(item => {
				// They are checkboxes thou
				let filterBtn = helpers.createElement('input');
				let filterBtnLabel = helpers.createElement('label');

				// Adding attributes to the checkbox's label
				filterBtnLabel.htmlFor = `button-${item}`;
				filterBtnLabel.textContent = `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
				// filterBtnLabel.textContent = `button-${item}`;
				filterBtnLabel.className = `label-${item}`;

				// Adding attributes to the checkbox
				filterBtn.type = 'checkbox';
				filterBtn.id = `button-${item}`;
				filterBtn.className = 'filter-btn';
				filterBtn.value = item;
				filterBtn.name = item;
				// filterBtn.dataset.color = `var(--${item}-color)`; // Does not work 😞
				filterBtn.checked = true;
				filterBtn.textContent = item;
				
				// Not needed to do refreshing like this anymore
				filterBtn.addEventListener('change', this.refreshMap(item))

				// Appending the checkboxes
				app.header.appendChild(filterBtn);
				app.header.appendChild(filterBtnLabel);
			})
		},
		// Not needed to do refreshing like this anymore
		refreshMap() {
			// A Closure making use of Currying ^^
			return function() {
				// console.log('refreshMap', data, storage.buildingData);
				map.refreshMap();
			}
		}
	}

	app.init();
})()

