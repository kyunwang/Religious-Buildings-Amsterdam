'use strict';

import api from './api.js';
import storage from './storage.js'

(function() {
	const app = {
		data: [],
		init() {
			api.init();
		}
	}

	app.init();
})()

