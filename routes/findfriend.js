var models = require("../models");

exports.view = function(req, res) {
	var username = req.session.username;
	if (username != undefined) {
		models.User.find({username : username}, function(err, user) {
			res.render("findfriend", {"numNotifs" : user[0].numNotifs});
		});
	} else {
		res.render("accessdenied");
	}
}

exports.ask = function(req, res){
	var username = req.session.username;
	if (username != undefined) {
		var friendsearch = req.body.searchname;
		findPerson(res, friendsearch, username);
		
	} else {
		res.render('accessdenied');
	}
};

var findPerson = function(res, friendsearch, username) {
	models.User.find({username : friendsearch}, function(err, friend) {
		if (friend.length == 0) {
			res.send("User does not exist.");
		} else if (areFriends(friend, username)) {
			var url = 'closet?user=' + friend[0].username;
			res.redirect(url);
		} else {
			sendFriendRequest(username, friend[0], res);
		}
	});
}

var sendFriendRequest = function(username, friend, res) {
	var friendRequest = new models.Notification({
		"recipient": friend.username,
		"sender": username,
		"borrow": false,
		"date": null,
		"itemID": null,
		"friend": true
	});
	friendRequest.save(function(err) {
		console.log(username);
		models.User.find({username : friend.username}, function(err, user) {
			var numNotifs = user[0].numNotifs;
			numNotifs++;
			console.log(user[0]);
			models.User.findByIdAndUpdate(user[0]._id, {numNotifs: numNotifs}, function(err, otherUser) {
				if (err) throw err;
				//currentUser.save(function(err) {
					res.render("requestsent");
				//});
			});
		});
	});
}

var areFriends = function(friend, username) {
	var friendlist = friend.friendslist;
	for (i in friendlist) {
		if (friendslist[i] == username) {
			return true;
		}
	}
	return false;
}



// find the item that goes along with the id
// render page

/*var findUsername = function (users, username) {
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
}*/