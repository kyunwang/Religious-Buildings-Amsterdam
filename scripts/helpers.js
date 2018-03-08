'use strict';

const helpers = {
	getElement(element) { return document.querySelector(element) },
	getElements(element) { return document.querySelectorAll(element) },
	createElement(element) { return document.createElement(element) },
	groupItems(dataArray, f) {
		var groups = {};
		
		dataArray.forEach(function (o) {
			console.log(o);
			
			var group = JSON.stringify(f(o));
			groups[group] = groups[group] || [];
			groups[group].push(o);
		});
		console.log(groups);
		return Object.values(groups).map(function (group) {
			console.log(11, group);
			
			return groups[group];
		})
	},
	randomYear(startYear = null) {
		const chance = Math.random();

		if (!startYear) {
			return Math.floor(chance * (2017 - 1600) + 1600);
		}

		if (startYear && chance > .6) {
			return Math.floor(chance * (2017 - startYear) + startYear);
		} 

		return null;

	}
}

export default helpers;