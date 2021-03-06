var models = require('../models');
var bcrypt = require('bcrypt');


exports.view = function(req, res){
	res.render('register');
};

exports.adduser = function(req, res) {

		// Get form values
		var userDisplayName = req.body.userdisplayname;
		var username = req.body.username;
		var userEmail = req.body.useremail;
		var userPassword = req.body.userpassword;

		models.User.find({username : username}, function(err, user) {
			console.log(user);
			if (user.length != 0) {
				console.log("there is a user with that name.");
				//change this to render a different handlebars page
				res.render("accessdenied");
			} else {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(userPassword, salt);
                var newUser = new models.User({
                    "username": username,
                    "name": userDisplayName,
                    "password": hash,
                    "email": userEmail,
                    "friendslist": [username],
                    "closet": [],
                    "numNotifs": 0,
                    "borroweditems": []
		          });

		newUser.save(afterSaving);
		
		function afterSaving(err) { // this is a callback
			req.session.username = username;
  			if(err) {console.log(err); res.send(500); }
  			res.redirect('add');
			}
	}
});



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