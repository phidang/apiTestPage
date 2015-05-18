var redis = require('redis');
var client = redis.createClient();

module.exports = {
	clientRedis: client,
	connect: client.on('connect', function() {
		console.log('Connected to Redis.');
	}),
};
