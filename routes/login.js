var data = require("../users.json");
var items = require("../items.json");

exports.view = function(req, res){
	console.log(data);
	res.render('login');
};

exports.loguserin = function(req, res) {
		console.log(data);
		// Get form values
		var username = req.body.username;
		var userPassword = req.body.userpassword;

		var userObj = findUsername(data["users"], username);

		if (userObj != null) {
			if (userObj["password"] === userPassword) {
				//login success
				req.session.username = username;
				var itemObj = getCloset(items.items, data.users, username, true);
				res.render('closet', itemObj);
			} else {
				console.log("wrong password");
				res.render('accessdenied');
			}
		} else {
			console.log("user does not exist");
			res.render('accessdenied');
		}

		//res.render('closet', userObj);
};

var findUsername = function (users, username) {

	for (i in users) {
		console.log(users[i].username);
		if (users[i].username === username) {
			return users[i];
		}
	}
	return null;
}

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

var findItemByID = function (items, itemID) {
	for (i in items) {
		if (items[i].itemID === itemID) {
			return items[i];
		}
	}
	return null;
}