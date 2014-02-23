var models = require("../models");

exports.view = function(req, res){
	var username = req.session.username;
	if (username != undefined) {
		var itemslist = [];
		models.User.find({username : username}, function(err, user){
			belongsToFriend(res, user[0]);
		});
		/*var friendslist = getFriendsList(data.users, username);
		var itemsjson = items.items;
		for (i in itemsjson) {
			var owner = itemsjson[i].ownedby;
			for (f in friendslist) {
				if (friendslist[f] == owner) {
					itemslist.push(itemsjson[i]);
				}
			}
		}*/

	} else {
		res.render('accessdenied');
	}
};

var belongsToFriend = function(res, user) {
	var friendslist = user.friendslist;
	models.Item.find({ownedby: { $in : friendslist}}).sort({_id: -1}).exec(function(err, items) {
		console.log(user.numNotifs);
		res.render('feed', {"items" :items, "numNotifs": user.numNotifs});
	});
}



/*var getFriendsList = function(users, username) {
	var user = findUsername(users, username);
	if (user != null) {
		return user.friendslist;
	} else {
		return null;
	}
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

var dateAddedCmp = function (a, b) {
	if (a.itemID < b.itemID) {
		return 1;
	} else if (a.itemID > b.itemID) {
		return -1;
	} else {
		return 0;
	}
}*/