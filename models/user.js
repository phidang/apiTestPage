var fs = require('fs');
var crypto = require('crypto');
var client = require('./clientRedis.js').clientRedis;

function hashPass(username, password) {
	var myHash = crypto.createHash('sha512');
	myHash.update(password);
	myHash.update(username);
	return myHash.digest('hex').toString();
};

function add_NewUserToRedis(username, password, cb) {
	client.incr('new_user_id', function (err, newID) {
		var hashedPassword = hashPass(username, password);
		var message = {
			id: newID,
			username: username,
			password: hashedPassword,
		};
		client.set(username, newID);
		client.hmset(newID, 'username', username, 'password', hashedPassword);
		cb(message);
	});
};

module.exports = {
	Add: function (username, password, cb) {
		client.get(username, function (err,	id) {
			if (!id) {
				add_NewUserToRedis(username, password, function (msg) {
					cb(msg);
				}); 
			} 
			else {
				cb({'message': 'This username has been registed.'});
			}
		});
	},

	Login: function (username, password, req, cb) {
		client.get(username, function (err, id) {
			if (!id) {
				cb({'message': 'This username does not exist.'});
			}
			else {
				client.hgetall(id, function (err, user) {
					var hashedPassword = hashPass(username, password);
					if (user.password !== hashedPassword) {
						cb({'message': 'Wrong password.'});
					}
					else {
						req.session.user = user;
						cb({
							'message': 'Login successfully.',
							'user': user.username,
						});
					}
				});
			}
		});

	}
};