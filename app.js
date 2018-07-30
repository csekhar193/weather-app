const yargs = require('yargs'),
      geocode = require('./geocode/geocode'),
      weather = require('./weather/weather');

const argv = yargs.options({
	a: {
		demand: true,
		alias: 'address',
		describe: 'Address to fetch weather for',
		string: true
	}
}).help()
  .alias('help','h')	
  .argv; 

const address = argv.address;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
// 	if (errorMessage) {
// 		console.log(errorMessage);
// 	} else {
// 		// console.log(JSON.stringify(results, undefined, 2));
// 		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
// 			if (errorMessage) {
// 				console.log(errorMessage);
// 			} else {
// 				console.log(`The Temperature in ${results.address} is ${weatherResults.temperature}`);
// 			}
// 		});
// 	}
// });


let getGeoCodeAdrress = (address) => {
	return new Promise( (resolve, reject) => {
		geocode.geocodeAddress(argv.address, (errorMessage, results) => {
			if (errorMessage) {
				reject(errorMessage);
			} else {
				console.log()
				resolve(results);
			}
		});
	});
}

let getWeatherDetails = (lat, lng) => {
	return new Promise((resolve, reject) => {
	  	weather.getWeather(lat, lng, (errorMessage, weatherResults) => {
			if (errorMessage) {
				reject(errorMessage);
			} else {
				resolve(weatherResults);
			}
		});

	})
} 

getGeoCodeAdrress(address)
	.then((results) => {
		console.log(results.address);
		return getWeatherDetails(results.latitude, results.longitude);
	})
	.then((weatherResults)=>{
		console.log(`Its currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
	})
	.catch((errorMessage) => {
		console.log(errorMessage);
	})





