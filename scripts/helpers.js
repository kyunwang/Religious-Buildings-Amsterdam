'use strict';

const helpers = {
	getElement(element) { return document.querySelector(element) },
	getElements(element) { return document.querySelectorAll(element) },
	createElement(element) { return document.createElement(element) },
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