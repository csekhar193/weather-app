const request = require('request'),
	  url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
let geocodeAddress = (address, callback) => {
	const uri = encodeURIComponent(address);

	request({
				url: url+uri,
				json:true
			}, (error, response, body) => {
				if(error){
					callback('Unable to connect ot Google servers');
				} else if (body.status == 'ZERO_RESULTS') {
					callback('Unable to find that address.');
				} else if (body.status == 'OK') {
					callback(undefined, {
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng
					});
				}
				
			});
}

module.exports = {
	geocodeAddress
}