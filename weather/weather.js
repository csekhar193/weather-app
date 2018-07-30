const request = require('request');



let getWeather = (lat, lng, callback) => {
	request({
			url: `https://api.darksky.net/forecast/b2830063f0d55e084833946b22f41e64/${lat},${lng}`,
			json:true
		}, (error, response, body) => {
			if ( !error && response.statusCode === 200 ) {
				callback(undefined,  { 
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature
				});
			} else {
				callback('Unable to fetch weather');
			}
			
		});
}

module.exports = {
	getWeather
}
