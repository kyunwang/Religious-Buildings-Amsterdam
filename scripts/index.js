'use strict';

import api from './api.js';
import storage from './storage.js'

(function() {
	const app = {
		data: [],
		init() {
			console.log('123');
			this.data = storage.filterData(api.init());
			console.log(this);
			
		}
	}

	app.init();
})()

