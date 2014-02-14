var users = require('../users.json');
var items = require('../items.json');
var notifs = require('../notifications.json');


exports.view = function(req, res){
	var username = req.session.username;
	if (username != undefined) {
		var notifsList = findNotifs(notifs["notifications"], username)
		console.log(notifsList);
		res.render('requests', {"list" : notifsList });
	} else {
		res.render('acessdenied');
	}
};

exports.acceptborrow = function(res, req) {
	var username = req.session.username;
	//email both
	//set item's info - Database version
	//remove notification
};

exports.rejectborrow = function(res, req) {
	var username = req.session.username;
	//email sender
	//remove notification
};

exports.acceptfriend = function(res, req) {
	var username = req.session.username;
	//email sender
	//add to friends list - database version
	//remove notification
};

exports.rejectfriend = function(res, req) {
	var username = req.session.username;
	//email sender
	//remove notification
};

var findNotifs = function(notifications, username) {
	var notifsList = [];
	console.log(notifications);
	for (n in notifications) {
		if (notifications[n].recipient === username) {
			var userInfo = findUsername(users.users, notifications[n].sender);
			var itemInfo = findItemByID(items.items, notifications[n].itemID);
			notifsList.push( { "notification" : notifications[n], "senderInfo" : userInfo, "itemInfo": itemInfo});
		} else {
			console.log("not found:");
			console.log(notifications[n]);
		}
	}
	return notifsList;
}

var findUsername = function (users, username) {
	for (i in users) {
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
}

