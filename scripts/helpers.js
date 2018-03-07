'use strict';

const helpers = {
	getElement(element) { return document.querySelector(element) },
	getElements(element) { return document.querySelectorAll(element) },
	createElement(element) { return document.createElement(element) }
}

export default helpers;