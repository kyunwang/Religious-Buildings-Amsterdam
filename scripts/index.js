'use strict';

import api from './api.js';
import storage from './storage.js'
import map from './map.js';

(function () {
	const app = {
		header: document.getElementById('header'),
		filterItems: ['synagogue', 'monastery', 'temple', 'church', 'mosque', 'shrine'],

		filterBtns: document.querySelectorAll('.filter-btn'),
		init() {

			api.init()
				.then(res => {
					console.log(res.results.bindings);
					this.assignFilterBtns();
					return res;
				}).then(res => {
					map.initMapLeaflet(res);
				})
		},

		assignFilterBtns(data) {
			console.log(this.filterBtns);
			this.filterItems.forEach(item => {
				let filterBtn = document.createElement('button');
				filterBtn.value = item;
				filterBtn.name = item;
				filterBtn.textContent = item;
				
				filterBtn.addEventListener('click', this.test(item))
				// filterBtn.addEventListener('click', function() {
				// 	app.test(item);
				// })

				app.header.appendChild(filterBtn)
			})
		},

		test: function(data) {
			// Closure - Currying?
			console.log('test1', data);
			return function() {
				console.log('test2', data);
			}
			
		}
	}

	app.init();
})()

