var fs = require('fs');
var price = require('./price.json');
var Data = price;
var mapDataID = {};
var ShowingData = [];

function mapID() {
	for (var i=0; i<Data.length; i++) {
		mapDataID[Data[i].id] = Data[i];
	}
}
mapID();

function searchInData(keyword) {
	var result = [];
	for (var i=0; i<Data.length; i++) {
		if (Data[i].name.indexOf(keyword) > -1) {
			result.push(Data[i]);
		}
	}
	if (result.length == 0 || !result) {
		result = 'Not found.';
	}
	return result;
}

function setData(data, newData) {
	for (var property in data) {
		if (data.hasOwnProperty(property) && newData.hasOwnProperty(property)) {
			data[property] = newData[property];
		}
	}
	return data;
}

function countingSort() {
	var data = [], cntID = [];
	for (var i = 0; i<Data.length; i++) {
		cntID.push(0);
	}
	for (var i = 0; i<ShowingData.length; i++) {
		cntID[ShowingData[i].id]++;
	}
	for (var i = 0; i<Data.length; i++) {
		if (cntID[i] != 0) {
			data.push(mapDataID[i]);
		}
	}
	return data;
}

function quickSort(l, r) {
	var i = l, j = r;
	var pivot = ShowingData[Math.floor((i+j)/2)];
	while (i<=j) {
		while (i<r && ShowingData[i].name<pivot.name) i++;
		while (j>l && ShowingData[j].name>pivot.name) j--;
		if (i<=j) {
			var tmp = ShowingData[i];
			ShowingData[i] = ShowingData[j];
			ShowingData[j] = tmp;
			i++;
			j--;
		}
	}
	if (l<j) quickSort(l,j);
	if (i<r) quickSort(i,r);
}

module.exports = {
	getAllBooks: function () {
		ShowingData = Data;
		return {'result': Data};
	},

	getABook: function (id) {
		var result = mapDataID[id];
		if (!result) {
			result = 'We do not have this book with that ID.';
		}
		else {
			ShowingData = [result];
		}
		return {'result': result};
	},

	search: function (keyword) {
		var result = searchInData(keyword);
		ShowingData = result;
		return {'result': result};
	},

	update: function (id, data) {
		var result;
		if (!mapDataID[id]) {
			result = 'We do not have this book with that ID.';
		}
		else {
			result = setData(mapDataID[id], data);
			ShowingData = [result];
		} 
		return {'result': result};
	},

	delete: function (id) {
		var result;
		if (!mapDataID[id]) {
			result = 'We dont have any book with that ID.';
		}
		else {
			Data = Data.filter(function (e) {
				return e.id != id;
			});
			mapDataID[id] = null;
			ShowingData = [];
			result = 'delete success';
		}
		return {'result': result};
	},

	sortByID: function () {
		if (ShowingData.length == 0) {
			return {'result': 'We dont have any book to sort.'};
		}
		result = countingSort();
		ShowingData = result;
		return {'result': result};
	},

	sortByName: function () {
		if (ShowingData.length == 0) {
			return {'result': 'We dont have any book to sort.'};
		}
		quickSort(0, ShowingData.length-1);
		result = ShowingData;
		return {'result': result};
	},

	paging: function (page, itemsPerPage) {
		var result = [];
		for (var i=itemsPerPage*(page-1); i<=itemsPerPage*(page)-1; i++) {
			if (i>=0 && i<Data.length) {
				result.push(Data[i]);
			}
		}
		if (result.length == 0) {
			result = 'No result.';
		}
		return {'result': result};
	},
};