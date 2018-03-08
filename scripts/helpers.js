'use strict';

const helpers = {
	getElement(element) { return document.querySelector(element) },
	getElements(element) { return document.querySelectorAll(element) },
	createElement(element) { return document.createElement(element) },
	groupItems(dataArray) {

		var output = [];

		dataArray.forEach(function(value) {
			var existing = output.filter(function(v, i) {
			  return v.name == value.name;
			});

			if (existing.length) {
			  var existingIndex = output.indexOf(existing[0]);
			  console.log(output);
			  
			  output[existingIndex].value = output[existingIndex].value.concat(value.value);
			} else {
			  if (typeof value.value == 'string')
				 value.value = [value.value];
			  output.push(value);
			}
		 });

		 console.log(output);
		 
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