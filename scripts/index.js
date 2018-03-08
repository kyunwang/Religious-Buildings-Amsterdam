'use strict';

import api from './api.js';
import map from './map.js';
import storage from './storage.js';
import helpers from './helpers.js';

(function () {
	const app = {
		header: helpers.getElement('header'),
		filterContainer: helpers.getElement('#filter-container'),
		init() {
			api.init()
				.then( async res => {
					storage.buildingData = res;
					await this.assignFilterCheckboxes(); // Assing and create the buttons first
					map.filterCheckboxes = helpers.getElements('.filter-checkbox'); // Then get them for later use
					// return res;
				}).then(() => {
					storage.groupItems(storage.buildingData.results.bindings);

					map.initMap(storage.buildingData);
				})
		},

		assignFilterCheckboxes(data) {
			const keys = storage.buildingData.results.bindings.map(item => item.type.value);
			
			// Get the available keys only & remove duplicates
			map.filterItems = keys.filter((d, i, self) => i === self.indexOf(d));

			map.filterItems.forEach(item => {
				// They are checkboxes thou
				let filterCheckbox = helpers.createElement('input');
				let filterCheckboxLabel = helpers.createElement('label');

				// Adding attributes to the checkbox's label
				filterCheckboxLabel.htmlFor = `button-${item}`;
				filterCheckboxLabel.textContent = `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
				// filterCheckboxLabel.textContent = `button-${item}`;
				filterCheckboxLabel.className = `label-${item}`;

				// Adding attributes to the checkbox
				filterCheckbox.type = 'checkbox';
				filterCheckbox.id = `button-${item}`;
				filterCheckbox.className = 'filter-checkbox';
				filterCheckbox.value = item;
				filterCheckbox.name = item;
				// filterCheckbox.dataset.color = `var(--${item}-color)`; // Does not work 😞
				filterCheckbox.checked = true;
				filterCheckbox.textContent = item;
				
				// Not needed to do refreshing like this anymore
				filterCheckbox.addEventListener('change', map.refreshFilterMap);

				// Appending the checkboxes
				app.filterContainer.appendChild(filterCheckbox);
				app.filterContainer.appendChild(filterCheckboxLabel);
			})
		},

		// Not needed to do refreshing like this anymore
		refreshMap() {
			// A Closure making use of Currying ^^
			return function() {
				// console.log('refreshMap', data, storage.buildingData);
				map.refreshFilterMap();
			}
		}
	}

	app.init();
})()

