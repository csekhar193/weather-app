let getUser = (id, callback) => {
	let user = {
		id: id,
		name: 'chandu'
	}
	callback(user);
};


getUser(31, (user) => {
	console.log(user);
});