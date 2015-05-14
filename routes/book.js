var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');
var bookController = require('../controllers/book.js');

router.route('/view')
	.get(userController.authen, bookController.bookView);
router.route('/view/:id') 
	.get(userController.authen, bookController.bookView);
router.route('/search')
	.get(userController.authen, bookController.bookSearch);
router.route('/search/:searchKey')
	.get(userController.authen, bookController.bookSearch);
router.route('/update/:id')
	.post(userController.authen, bookController.bookUpdate);
router.route('/remove/:id')
	.delete(userController.authen, bookController.bookRemove);
router.route('/sort/:sortBy')
	.get(userController.authen, bookController.bookSort);
router.route('/paging/:page/:itemsPerPage')
	.get(userController.authen, bookController.paging);

module.exports = router;