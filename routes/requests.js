var models = require("../models");


exports.view = function(req, res){
	var username = req.session.username;
	if (username != undefined) {
		findNotifs(res, username);
	} else {
		res.render('acessdenied');
	}
};

exports.acceptborrow = function(req, res) {
	var username = req.session.username;
	var notifID = req.body.notifID;
	models.Notification.findById(notifID, function(err, notif) {
		var itemID = notif.itemID;
		models.Item.findByIdAndUpdate(itemID, {borrowedby: notif.sender, borrowdate: notif.date}, function(err, item){
			item.save(function(err) {
				models.Notification.findByIdAndRemove(notifID, function(err) {
					models.User.find({username: notif.sender}, function(err, user) {
						models.User.find({username: username}, function (err, currentUser) {
							var numNotifs = currentUser[0].numNotifs;
							numNotifs--;
							models.User.findByIdAndUpdate(currentUser[0]._id, {numNotifs : numNotifs}, function(err, currentUser) {
								currentUser.save(function(err) {});
							});
						});
						res.send("Borrower's email is " + user[0].email + ". Send them an email to pick up their newly borrowed item!");
					});
				});
			});
		});
		
	});

};

exports.rejectborrow = function(req, res) {
	var username = req.session.username;
	var notifID = req.body.notifID;
	models.Notification.findByIdAndRemove(notifID, function(err) {
		models.User.find({username: username}, function (err, currentUser) {
			var numNotifs = currentUser[0].numNotifs;
			numNotifs--;
			models.User.findByIdAndUpdate(currentUser[0]._id, {numNotifs : numNotifs}, function(err, currentUser) {
				currentUser.save(function(err) {});
			});
		});
		res.redirect('/requests');
	});
};

exports.acceptfriend = function(req, res) {
	var username = req.session.username;
	var notifID = req.body.notifID;
	models.Notification.findById(notifID, function(err, notif) {
		models.User.find({username: notif.sender}, function(err, friend) {
			models.User.find({username: notif.recipient}, function(err, user) {
				var friendslist = user[0].friendslist;
				friendslist.push(notif.sender);
				models.User.findByIdAndUpdate(user[0]._id, {friendslist : friendslist}, function(err, user) {
					user.save(function(err) {});
				});
			});
			var friendslist = friend[0].friendslist;
			friendslist.push(notif.recipient);
			models.User.findByIdAndUpdate(friend[0]._id, {friendslist: friendslist}, function(err, friend) {
				friend.save(function(err) {});
			});
		});
		models.Notification.findByIdAndRemove(notifID, function(err) {
			models.User.find({username: username}, function (err, currentUser) {
				var numNotifs = currentUser[0].numNotifs;
				numNotifs--;
				models.User.findByIdAndUpdate(currentUser[0]._id, {numNotifs : numNotifs}, function(err, currentUser) {
					currentUser.save(function(err) {
						res.send("Friend added!");
					});
				});
			});
		});
	});
	//email sender
	//add to friends list - database version
	//remove notification
};

exports.rejectfriend = function(req, res) {
	var username = req.session.username;
	var notifID = req.body.notifID;
	models.Notification.findByIdAndRemove(notifID, function(err) {
		models.User.find({username: username}, function (err, currentUser) {
			var numNotifs = currentUser[0].numNotifs;
			numNotifs--;
			models.User.findByIdAndUpdate(currentUser[0]._id, {numNotifs : numNotifs}, function(err, currentUser) {
				currentUser.save(function(err) {
					res.redirect('/requests');
				});
			});
		});
	});
};

var findNotifs = function(res, username) {
	models.Notification.find({recipient: username}, function(err, notifs) {
		models.User.find({username : username}, function(err, user) {
			res.render('requests', {"list" : notifs, "numNotifs": user[0].numNotifs});
		});
	});
}

/*var findNotifs = function(notifications, username) {
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
*/
