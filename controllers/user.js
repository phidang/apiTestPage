var fs = require('fs');
var express = require('express');
var User = require('../models/user.js');

module.exports = {
	authen: function (req, res, next) {
		(req.session.user) ? next() : res.send({'result': 'You have to login first.'});
	},

	register: function (req, res) {
		console.log('Register');
		var user = req.body;
		if (req.session && req.session.user) {
			res.json({'message': 'Already logged in.'});
		}
		else {
			User.Add(user.username, user.password, function (msg) {
				res.json(msg);
			});
		}
	},

	login: function (req, res) {
		console.log('Login');
		var message, user = req.body;
		if (req.session && req.session.user) {
			res.json({'message': 'Already logged in.'});
		}
		else {
			User.Login(user.username, user.password, req, function (msg) {
				res.json(msg);
			});
		}
	},

	logout: function (req, res) {
		console.log('Logout');
		var message;
		if (req.session && req.session.user) {
			req.session = null;
			message = {'message': 'Logout successfully.'};
		}
		else {
			message = {'message': 'You have not login yet.'};
		}
		res.json(message);
	}

};
