'user strict';

const storage = {
	firstWW: [],
	filterData(data) {
	// filterDataWW(data) {
		console.log(data.results);
		// First WW dat in A'dam
		// this.firstWW = data.results.bindings.filter(item => (item.date.value > 1914) && (item.date.value < 1919) );
		// console.log(this.firstWW);



		
	},
	cleanData(data) {
		data.results.bindings = data.results.bindings.map(item => {
			if (!item.coordinate_location) return item;
			// console.log(item);
			
			// Clean and create usable coordinates
			let coords = item.coordinate_location.value
				.split(' ')

				coords = coords.map((item, i) => {
					return item.replace(/[^0-9\.]+/g, "");
				})

				item.coordinate_location.value = coords;

				return item;
		});
		return data;
	}
	// filterData(data) {

	// }
}

export default storage;