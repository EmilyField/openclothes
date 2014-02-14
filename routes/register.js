var data = require("../users.json");

exports.view = function(req, res){
	res.render('register');
};

exports.adduser = function(req, res) {

		// Get form values
		var userDisplayName = req.body.userdisplayname;
		var username = req.body.username;
		var userEmail = req.body.useremail;
		var userPassword = req.body.userpassword;

		var newUser = {
			"username": username,
			"name": userDisplayName,
			"password": userPassword,
			"email": userEmail,
			"friendslist": [],
			"closet": [],
			"notifications": [],
			"borroweditems": []
		};
		
		data["users"].push(newUser);
		res.render('closet', newUser);
};