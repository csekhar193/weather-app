const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help','h')	
	.argv;

const address = argv.address;
let uri = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${uri}`;

axios.get(geocodeUrl)
	.then((response) => {
		if ( response.data.status === 'ZERO_RESULTS' ) {
			throw new Error('Unable to find that address');
		}

		let lat = response.data.results[0].geometry.location.lat;
		let lng = response.data.results[0].geometry.location.lng;
		let address = response.data. results[0].formatted_address;
		let weatherUrl = `https://api.darksky.net/forecast/b2830063f0d55e084833946b22f41e64/${lat},${lng}`
		console.log(address);
		return axios.get(weatherUrl);
	})
	.then((response) => {
		var temperature = response.data.currently.temperature;
		var apparentTemperature = response.data.currently.apparentTemperature;
		console.log(`Its currently ${temperature}. It feels like ${apparentTemperature}.`);
	})
	.catch((e) => {
		if (e.code === 'ENOTFOUND') {
			console.log('Unable to connect to API servers');
		} else {
			console.log(e.message);
		}
	});