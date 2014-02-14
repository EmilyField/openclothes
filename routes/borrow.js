var items = require("../items.json");
var users = require("../users.json");
var notifs = require("../notifications.json");

exports.view = function(req, res){
	var username = req.session.username;
	if (username != undefined) {
		var itemID = req.query.itemID;
		var item = findItemByID(items.items, itemID);
		res.render('borrow', item);
	} else {
		res.render('accessdenied');
	}
};

// find the item that goes along with the id
// render page

var findItemByID = function (items, itemID) {
	for (i in items) {
		if (items[i].itemID === itemID) {
			return items[i];
		}
	}
};

exports.ask = function(req, res) {
	var username = req.session.username;
	var date = req.body.date;
	var itemID = req.body.itemID;
	var item = findItemByID(items.items, itemID);

	var borrowreq = {
		"notifID": generateID(),
		"recipient": item.ownedby,
		"sender": username,
		"borrow": true,
		"date": date,
		"itemID": itemID,
		"friend": false,
	}
	notifs.notifications.push(borrowreq);
	console.log(borrowreq);
	res.render('requestsent');
}

var generateID = function() {
	var seconds = new Date().getTime() * 2;
	seconds = seconds.toString();
	return seconds;
}