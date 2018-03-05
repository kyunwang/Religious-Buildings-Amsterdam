'user strict';

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
	`),
	init: async function () {
		this.queryUrl = `https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=${this.query}&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`;
		console.log(this);

		return await fetch(this.queryUrl)
			.then(res => res.json())
			// .then(res => {console.log(res) ; return res })
	}

}

export default api;