exports.view = function(req, res){
	res.render('register');
};

exports.adduser = function(db) {
	return function(req, res) {

		// Get form values
		var userDisplayName = req.body.userdisplayname;
		var username = req.body.username;
		var userEmail = req.body.useremail;
		var userPassword = req.body.userpassword;

		var collection = db.get('usercollection');

		collection.insert({
			"username" : username,
			"name" : userDisplayName,
			"email": userEmail,
			"password": userPassword,
			"closet": [],
			"friends": [],
			"notifications": [],
			"borroweditems": []
		}, function(err, doc) {
			if (err) {
				res.send("There was a problem adding the information to the database.");
			} else {
				res.location("closet");
				res.redirect("closet");
			}
		});
	};
};