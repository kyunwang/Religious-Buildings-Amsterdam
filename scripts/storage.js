'user strict';

const storage = {
	firstWW: [],
	filterData(data) {
	// filterDataWW(data) {
		console.log(data.results);
		// First WW dat in A'dam
		this.firstWW = data.results.bindings.filter(item => (item.date.value > 1914) && (item.date.value < 1919) );
		console.log(this.firstWW);


		var imgdiv = document.getElementById('images');

		var rows = this.firstWW;

		for (let i = 0; i < rows.length; ++i) {
			console.log(i);
			
			var img = document.createElement('img');
			img.src = rows[i]['img']['value'];
			// img.title = rows[i]['title']['value'];
			imgdiv.appendChild(img);

		}
	},
	// filterData(data) {

	// }
}

export default storage;