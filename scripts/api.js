'user strict';

import storage from './storage.js';

const api = {
	query: encodeURIComponent(`
		PREFIX hg: <http://rdf.histograph.io/>
		PREFIX dct: <http://purl.org/dc/terms/>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX foaf: <http://xmlns.com/foaf/0.1/>
		PREFIX void: <http://rdfs.org/ns/void#>
		PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
		SELECT ?cho ?building ?img ?date ?col WHERE {
			?cho dct:spatial ?b .
			?b a hg:Building .
			?b rdfs:label ?building .
			?cho foaf:depiction ?img .
			?cho sem:hasBeginTimeStamp ?date .
			?cho void:inDataset ?col .
		} 
		ORDER BY ?date
		LIMIT 50
	`),
	queryImg: encodeURIComponent(`
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	PREFIX schema: <http://schema.org/>
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>
	PREFIX void: <http://rdfs.org/ns/void#>
	SELECT * WHERE {
		?cho dc:subject ?onderwerp .
		?cho foaf:depiction ?img .
		?cho dc:date ?date .
		?cho void:inDataset ?dataset .
	}
`),
	init: async function () {
		this.queryUrl = `https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=${this.queryImg}&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`;
		console.log(this);

		await fetch(this.queryUrl)
		// await fetch('../data.json')
			.then(res => res.json())
			.then(res => {
				storage.filterData(res);
			});
	}

}

export default api;