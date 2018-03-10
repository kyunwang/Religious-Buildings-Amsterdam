'use strict';

import storage from './storage.js';

const api = {
	endpointUrl: 'https://query.wikidata.org/sparql',
	// query: `
	// 	SELECT ?synagogue ?synagogueLabel ?monastery ?monasteryLabel ?temple ?templeLabel ?church ?churchLabel ?shrine ?shrineLabel ?mosque ?mosqueLabel ?image ?coordinate_location ?type WHERE {
	// 		SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }

	// 		{  
	// 		?mosque wdt:P31 wd:Q32815 .
	// 		?mosque wdt:P131 wd:Q9899 .
	// 		BIND('mosque' AS ?type) .
	// 		OPTIONAL {
	// 			?mosque wdt:P18 ?image .
	// 			?mosque wdt:P625 ?coordinate_location .
	// 		}
	// 		} UNION {
	// 		?church wdt:P31 wd:Q16970 .
	// 		?church wdt:P131 wd:Q9899 .
	// 		BIND('church' AS ?type) .
	// 		OPTIONAL {
	// 			?church wdt:P18 ?image .
	// 			?church wdt:P625 ?coordinate_location .
	// 		}
	// 		} UNION {
	// 		?shrine wdt:P31 wd:Q697295 .
	// 		?shrine wdt:P131 wd:Q9899 .
	// 		BIND('shrine' AS ?type) .
	// 		OPTIONAL {
	// 			?shrine wdt:P18 ?image .
	// 			?shrine wdt:P625 ?coordinate_location .
	// 		}
	// 		} UNION {
	// 		?temple wdt:P31 wd:Q44539 .
	// 		?temple wdt:P131 wd:Q9899 .
	// 		BIND('temple' AS ?type) .
	// 		OPTIONAL {
	// 			?temple wdt:P18 ?image .
	// 			?temple wdt:P625 ?coordinate_location .
	// 		}
	// 		} UNION {
	// 		?monastery wdt:P31 wd:Q44613 .
	// 		?monastery wdt:P131 wd:Q9899 .
	// 		BIND('monastery' AS ?type) .
	// 		OPTIONAL {
	// 			?monastery wdt:P18 ?image .
	// 			?monastery wdt:P625 ?coordinate_location .
	// 		}
	// 		} UNION {
	// 		?synagogue wdt:P31 wd:Q34627 .
	// 		?synagogue wdt:P131 wd:Q9899 .
	// 		BIND('synagogue' AS ?type) .
	// 		OPTIONAL {
	// 			?synagogue wdt:P18 ?image .
	// 			?synagogue wdt:P625 ?coordinate_location .
	// 		}
	// 		}
	// 	}
	//  `,
	query: `
		SELECT ?item ?itemLabel ?image ?coordinate_location ?type WHERE {
		SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],nl". }
		{  
			?item wdt:P31 wd:Q32815 .
			?item wdt:P131 wd:Q9899 .
			BIND('mosque' AS ?type) .
			OPTIONAL {
				?item wdt:P18 ?image .
				?item wdt:P625 ?coordinate_location .
			}
		} UNION {
			?item wdt:P31 wd:Q16970 .
			?item wdt:P131 wd:Q9899 .
			BIND('church' AS ?type) .
			OPTIONAL {
				?item wdt:P18 ?image .
				?item wdt:P625 ?coordinate_location .
			}
		} UNION {
			?item wdt:P31 wd:Q697295 .
			?item wdt:P131 wd:Q9899 .
			BIND('shrine' AS ?type) .
			OPTIONAL {
				?item wdt:P18 ?image .
				?item wdt:P625 ?coordinate_location .
			}
		} UNION {
			?item wdt:P31 wd:Q44539 .
			?item wdt:P131 wd:Q9899 .
			BIND('temple' AS ?type) .
			OPTIONAL {
				?item wdt:P18 ?image .
				?item wdt:P625 ?coordinate_location .
			}
		} UNION {
			?item wdt:P31 wd:Q44613 .
			?item wdt:P131 wd:Q9899 .
			BIND('monastery' AS ?type) .
			OPTIONAL {
				?item wdt:P18 ?image .
				?item wdt:P625 ?coordinate_location .
			}
		} UNION {
			?item wdt:P31 wd:Q34627 .
			?item wdt:P131 wd:Q9899 .
			BIND('synagogue' AS ?type) .
			OPTIONAL {
				?item wdt:P18 ?image .
				?item wdt:P625 ?coordinate_location .
			}
		}
	}
`,
	init: async function () {
		const fullUrl = this.endpointUrl + '?query=' + encodeURIComponent(this.query)
		const headers = { 'Accept': 'application/sparql-results+json' };

		return await fetch(fullUrl, { headers })
			.then(res => res.json())
			.then(json => {
				// console.log(json);
				return storage.cleanData(json);
			});
	}

}

export default api;