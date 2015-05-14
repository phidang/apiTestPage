var fs = require('fs');
var Registered = [];
var Data = {};

module.exports = {
	Add: function (username, password) {
		if (Registered.indexOf(username) === -1) {
			this.id = Registered.length + 1;
			this.username = username;
			this.password = password;
			Data[this.username] = this;
			Registered.push(this.username);
			return this;
		}
		else {
			return {'message': 'This username has been registed.'};
		}
	},

	Login: function (username, password) {
		var idx = Registered.indexOf(username);
		if (idx === -1) {
			return {
				'status': false,
				'message': {'message': 'This username does not exist.'}
			};
		}
		else if (Data[username].password != password) {
			return {
				'status': false,
				'message': {'message': 'Wrong password.'}
			};
		}
		else {
			return {
				'status': true,
				'message': {'message': 'Login successfully.'},
				'user': Data[username]
			};
		}
	}
};