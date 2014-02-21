var models = require('../models');

var getItemsRec = function (user, itemList, n, res) {
	var items = user.closet;
	  if (n == items.length) {
	  	console.log(itemList);
	  	finishRes(res, user, itemList);
	  }
      if (n < items.length) {
          // tweet function
           models.Item.findById(items[n], function(err, item) {
              // the call back function
              //if no error, then save the id of the tweet
              if (!err) {
				itemList.push(item);
                return getItemsRec(user, itemList, n + 1, res);
               }

           });        
       }
  }

 var getItems = function(res, user) {

	getItemsRec(user, [], 0, res);
	
}

var finishRes = function(res, user, itemList) {
	var itemObj =  {"username": user.username, "mine": true, "items": itemList};
	console.log(itemObj);
	res.render('closet', itemObj);
}


exports.view = function(req, res){
	res.render('login');
};

exports.loguserin = function(req, res) {
		// Get form values
		var username = req.body.username;
		var userPassword = req.body.userpassword;
		console.log(username);
		console.log(userPassword);

		console.log("about to query");
		models.User.find({username: username, password: userPassword}, function(err, user) {
			if(err) {console.log(err); res.send(500); }
			if (user.length == 0) {
				console.log("wrong username or password");
				res.render("accessdenied")
			} else {
				req.session.username = username;
				console.log("about to getItems");
				getItems(res, user[0]);
			}
		});


		/*if (userObj != null) {
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
		}*/

		//res.render('closet', userObj);
};





/*var findUsername = function (users, username) {

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

var findItemByID = function (items, itemID) {
	for (i in items) {
		if (items[i].itemID === itemID) {
			return items[i];
		}
	}
	return null;
}*/