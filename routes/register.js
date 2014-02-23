var models = require('../models');


exports.view = function(req, res){
	res.render('register');
};

exports.adduser = function(req, res) {

		// Get form values
		var userDisplayName = req.body.userdisplayname;
		var username = req.body.username;
		var userEmail = req.body.useremail;
		var userPassword = req.body.userpassword;

		var newUser = new models.User({
			"username": username,
			"name": userDisplayName,
			"password": userPassword,
			"email": userEmail,
			"friendslist": [],
			"closet": [],
			"numNotifs": 0,
			"borroweditems": []
		});

		newUser.save(afterSaving);
		
		function afterSaving(err) { // this is a callback
			req.session.username = username;
  			if(err) {console.log(err); res.send(500); }
  			getItems(res, newUser);
		}

};

var getItemsRec = function (user, itemList, n, res) {
	var items = user.closet;
	  if (n == items.length) {
	  	console.log(res);
	  	finishRes(res, user, itemList);
	  }
      if (n < items.length) {
          // tweet function
          console.log(n);
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