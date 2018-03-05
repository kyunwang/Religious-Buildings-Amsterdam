'user strict';

const storage = {
	filterData(data) {
		console.log(data);
		return data.then(res => {
			console.log(res.results.bindings);
			
		})
		
	}
}

export default storage;