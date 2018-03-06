'user strict';

import storage from './storage.js';

const api = {
	endpointUrl: 'https://query.wikidata.org/sparql',
	query: `
	SELECT ?monastery ?monasteryLabel ?temple ?templeLabel ?church ?churchLabel ?shrine ?shrineLabel ?mosque ?mosqueLabel ?image ?coordinate_location WHERE {
		SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
		
		{  
		  ?mosque wdt:P31 wd:Q32815 .
		  ?mosque wdt:P131 wd:Q9899 .
		  OPTIONAL {
			 ?mosque wdt:P18 ?image .
			 ?mosque wdt:P625 ?coordinate_location .
		  }
		} UNION {
		  ?church wdt:P31 wd:Q16970 .
		  ?church wdt:P131 wd:Q9899 .
		  OPTIONAL {
			 ?church wdt:P18 ?image .
			 ?church wdt:P625 ?coordinate_location .
		  }
		} UNION {
		  ?shrine wdt:P31 wd:Q697295 .
		  ?shrine wdt:P131 wd:Q9899 .
		  OPTIONAL {
			 ?shrine wdt:P18 ?image .
			 ?shrine wdt:P625 ?coordinate_location .
		  }
		} UNION {
		  ?temple wdt:P31 wd:Q44539 .
		  ?temple wdt:P131 wd:Q9899 .
		  OPTIONAL {
			 ?temple wdt:P18 ?image .
			 ?temple wdt:P625 ?coordinate_location .
		  }
		} UNION {
		  ?monastery wdt:P31 wd:Q44613 .
		  ?monastery wdt:P131 wd:Q9899 .
		  OPTIONAL {
			 ?monastery wdt:P18 ?image .
			 ?monastery wdt:P625 ?coordinate_location .
		  }
		}
	 }
	 
	 LIMIT 200
	 `,
	init: async function () {
		console.log(this);

		// await fetch(this.queryUrl)
		// // await fetch('../data.json')
		// 	.then(res => res.json())
		// 	.then(res => {
		// 		storage.filterData(res);
		// 	});

		const fullUrl = this.endpointUrl + '?query=' + encodeURIComponent( this.query )
		const headers = { 'Accept': 'application/sparql-results+json' };

		return await fetch( fullUrl, { headers } )
			.then( res => res.json() )
			.then( json => {
				return storage.cleanData(json);
				// const { head: { vars }, results } = json;
				// for ( const result of results.bindings ) {
				// 		for ( const variable of vars ) {
				// 			console.log( '%s: %o', variable, result[variable] );
				// 		}
				// 		console.log( '---' );
				// }

				// return storage.filterData(json)
				// return json;
			});
	}

}

export default api;