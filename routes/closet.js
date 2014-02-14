var data = require('../items.json');
var users = require('../users.json');

exports.view = function(req, res){
	var username = req.session.username;
	var closetname = req.query.user;

	if (closetname == null) {
		closetname = username;
	}

	if (username != undefined) {
		if (username == closetname) {
			var itemObj = getCloset(data.items, users.users, username, true);
			console.log(itemObj);
			res.render('closet', itemObj);
		} else if (checkFriends(users.users, username, closetname)) {
			var itemObj = getCloset(data.items, users.users, closetname, false);
			res.render('closet', itemObj);
		} else {
			console.log("you are not friends");
			console.log(username);
			console.log(closetname);
			res.render('accessdenied');
		}
	} else {
		res.render('accessdenied');
	}
};

/*exports.viewother = function(req, res){
	var username = req.session.username;  // check if username is undefined
	if (username != undefined) {
		var closet_username = req.query.username;
		// check if friends
		if (checkFriends(users.users, username, closet_username)) {
			// get user's closet, make JSON of closet, param mine = false
			var itemObj = getCloset(data.items, users.users, closet_username, false);
			res.render('closet', itemObj);
		} else {
			console.log("you are not friends");
			res.render('accessdenied');
		}
	} else {
		res.render('accessdenied');
	}
};*/

// edit the closet page to make rows, display correct buttons.

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