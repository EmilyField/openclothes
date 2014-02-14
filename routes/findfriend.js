var items = require("../items.json");
var users = require("../users.json");
var notifs = require("../notifications.json");

exports.view = function(req, res) {
	var username = req.session.username;
	if (username != undefined) {
		res.render("findfriend");
	} else {
		res.render("accessdenied");
	}
}

exports.ask = function(req, res){
	var username = req.session.username;
	if (username != undefined) {
		var friendsearch = req.body.searchname;
		var user = findUsername(users.users, friendsearch);
		if (user == null) {
			user = findEmail(users.users, friendsearch);
		}
		if (user == null) {
			res.render('notfound');
		}

		var currentUser = findUsername(users.users, username);
		var friendslist = currentUser.friendslist;
		var friends = false;
		for (i in friendslist) {
			if (friendslist[i] == user.username) {
				friends = true;
			}
		}
		if (friends) {
			var url = 'closet?user=' + user.username;
			res.redirect(url);
		} else {
			var friendRequest = {
				"notifID" : generateID(),
				"recipient" : user.username,
				"sender" : username,
				"borrow" : false,
				"date" : "",
				"itemID": "",
				"friend": true,
			}
			notifs.notifications.push(friendRequest);
			console.log(friendRequest);
			res.render("requestsent");
		}
		// if friends, load page
		// if not, send request
	} else {
		res.render('accessdenied');
	}
};

// find the item that goes along with the id
// render page

var findUsername = function (users, username) {
	for (i in users) {
		console.log(users[i].username);
		if (users[i].username === username) {
			return users[i];
		}
	}
	return null;
}

var findEmail = function (users, email) {
	for (i in users) {
		console.log(users[i].email);
		if (users[i].email === email) {
			return users[i];
		}
	}
	return null;
}

var generateID = function() {
	var seconds = new Date().getTime().toString();
	return seconds;
}