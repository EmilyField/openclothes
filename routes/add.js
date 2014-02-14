var items = require("../items.json");
var users = require("../users.json");

exports.view = function(req, res) {  
	var username = req.session.username;
	if (username != undefined) {
		res.render('add');
	} else {
		res.render('accessdenied');
	}
}

exports.additem = function(req, res) {
	var username = req.session.username;
	var name = req.body.itemname;
	var brand = req.body.brand;
	var size = req.body.size;
	var imageURL = req.body.imageURL;
	var sunny = req.body.sunny;
	var clouds = req.body.clouds;
	var rain = req.body.rain;
	var snow = req.body.snow;
	var borrowable = req.body.borrowable;

	// make borrowable boolean
	if (borrowable != undefined) {
		borrowable = true;
	} else {
		borrowable = false;
	}

	var newItem = {
		"name" : name,
		"brand" : brand,
		"size" : size,
		"imageURL": imageURL,
		"itemID": generateID(),
		"likes": 0,
		"ownedby": username,
		"borrowable": borrowable,
		"borrowedby": "",
		"borrowdate": "",
		"weather": [],
		"borrowed": false
	}

	if (sunny != undefined) {
		newItem.weather.push(sunny);
	}
	if (clouds != undefined) {
		newItem.weather.push(clouds);
	}
	if (rain != undefined) {
		newItem.weather.push(rain);
	}
	if (rain != undefined) {
		newItem.weather.push(snow);
	}

	console.log(newItem);


	//add to user closet
	findUsername(users.users, username).closet.push(newItem);
	items.items.push(newItem);
	var itemObj = getCloset(items.items, users.users, username, true);
	res.render('closet', itemObj);
};

var getCloset = function(items, users, username, mine) {
	/*var user = findUsername(users, username);
	var closet = user.closet;
	var itemList = [];
	for (i in closet) {
		var item = findItemByID(items, closet[i]);
		itemList.push(item);
	}*/

	var itemList = [];
	for (i in items) {
		if (items[i]["ownedby"] == username) {
			itemList.push(items[i]);
		}
	}
	var itemObj = {"mine": mine, "items": itemList, "username": username};
	return itemObj;
}

var findUsername = function (users, username) {
	for (i in users) {
		console.log(users[i].username);
		if (users[i].username === username) {
			return users[i];
		}
	}
	return null;
}

var findItemByID = function (items, itemID) {
	for (i in items) {
		if (items[i].itemID === itemID) {
			return items[i];
		}
	}
	return null;
}

var checkFriends = function (users, username, other_username) {
	var user = findUsername(users, username);
	var friendsList = user.friendslist;
	for (i in friendsList) {
		if (friendsList[i] == other_username) {
			return true;
		}
	}
	return false;
}

var generateID = function() {
	var seconds = new Date().getTime().toString();
	return seconds;
}