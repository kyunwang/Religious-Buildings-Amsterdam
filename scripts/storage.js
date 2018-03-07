'user strict';

const storage = {
	filterData(data) {
		console.log(data.results);
	},
	cleanData(data) {
		data.results.bindings = data.results.bindings.map(item => {
			// console.log(item);
			if (!item.coordinate_location) return item;
			
			// console.log(item);
			
			// Clean and create usable coordinates
			let coords = item.coordinate_location.value
				.split(' ')

				coords = coords.map((item, i) => {
					return Number(item.replace(/[^0-9\.]+/g, ""));
				})

				item.coordinate_location.value = coords;

				return item;


			
		});
		return data;
	}
}

export default storage;