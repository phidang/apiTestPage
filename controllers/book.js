var fs = require('fs');
var express = require('express');
var Book = require('../models/book.js');

module.exports = {
	bookView: function (req, res) {
		if (!req.params) {
			res.json('Err on params.');
			return;
		}
		var result, bookID = req.params.id;
		if (!bookID) {
			result = Book.getAllBooks();
		}
		else { 
			result = Book.getABook(bookID);
		}
		res.send(result);
	},

	bookSearch: function (req, res) {
		if (!req.params) {
			res.json('Err on params.');
			return;
		}
		var result, keyword = req.params.searchKey || '';
		if (!keyword || keyword == '') {
			result = Book.getAllBooks();
		}
		else {
			result = Book.search(keyword);
		}
		res.send(result);
	},

	bookUpdate: function (req, res) {
		if (!req.params) {
			res.json('Err on params.');
			return;
		}
		var result, bookID = req.params.id, data = req.body;
		result = Book.update(bookID, data);
		res.send(result);
	},

	bookRemove: function (req, res) {
		if (!req.params) {
			res.json('Err on params.');
			return;
		}
		var result, bookID = req.params.id;
		result = Book.delete(bookID);
		res.send(result);
	},

	bookSort: function (req, res) {
		if (!req.params) {
			res.json('Err on params.');
			return;
		}
		var result;
		if (req.params.sortBy == 'id') {
			result = Book.sortByID();
		}
		else {
			result = Book.sortByName();
		}
		res.send(result);		
	},

	paging: function (req, res) {
		if (!req.params) {
			res.json('Err on params.');
			return;
		}
		var result, itemsPerPage = req.params.itemsPerPage, page = req.params.page;
		result = Book.paging(page, itemsPerPage);
		res.send(result);
	}
};