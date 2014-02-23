var models = require('../models');

exports.view = function(req, res){
	var username = req.session.username;
	var closetname = req.query.user;

	if (closetname == null || closetname == undefined) {
		closetname = username;
	}

	if (username != undefined) {
		if (username == closetname) {
			models.User.find({username : username}, function(err, user) {
				if (err) throw err;
				getItems(res, user[0], true);
			});
		} else {
			models.User.find({username : closetname}, function(err, user) {
				if (err) throw err;
				getItems(res, user[0], false);
			});
		} 
	} else {
		res.render('accessdenied');
	}
};

var getItemsRec = function (user, itemList, n, res, mine) {
	var items = user.closet;
	  if (n == items.length) {
	  	console.log(res);
	  	finishRes(res, user, itemList, mine);
	  }
      if (n < items.length) {
          // tweet function
          console.log(n);
           models.Item.findById(items[n], function(err, item) {
              // the call back function
              //if no error, then save the id of the tweet
              if (!err) {
				itemList.push(item);
                return getItemsRec(user, itemList, n + 1, res, mine);
               }

           });        
       }
  }

 var getItems = function(res, user, mine) {

	getItemsRec(user, [], 0, res, mine);
	
}

var finishRes = function(res, user, itemList, mine) {
	var itemObj =  {"username": user.username, "mine": mine, "items": itemList, "numNotifs" : user.numNotifs};
	console.log(itemObj);
	res.render('closet', itemObj);
}

/*var checkFriends = function(username, closetname) {
	models.User.find({})
}*/

//if (checkFriends(users.users, username, closetname))

/*
else {
			console.log("you are not friends");
			console.log(username);
			console.log(closetname);
			res.render('accessdenied');
		}*/


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

/*var getCloset = function(items, users, username, mine) {
	/*var user = findUsername(users, username);
	var closet = user.closet;
	var itemList = [];
	for (i in closet) {
		var item = findItemByID(items, closet[i]);
		itemList.push(item);
	}

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
}*/