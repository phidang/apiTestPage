var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');

router.route('/register')
	.post(userController.register);
router.route('/login')
	.post(userController.login);
router.route('/logout')
	.post(userController.logout);

module.exports = router;