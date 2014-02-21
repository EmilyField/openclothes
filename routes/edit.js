var models = require('../models');

exports.view = function(req, res){
	res.render('edit');
};

exports.remove = function(req, res) {
	var username = req.session.username;
	var itemID = req.query.itemID;
	models.Item.findByIdAndRemove(itemID, function(err) {
		models.User.find({username : username}, function (err, user) {
			var closet = user[0].closet;
			console.log(closet);
			for (i in closet) {
				if (closet[i] == itemID) {
					closet = closet.splice(i, 1);
					console.log(closet);
					models.User.findByIdAndUpdate(user[0]._id, {closet: closet}, function (err, user) {
						user.save(function(err) {
							console.log("about to redirect");
							res.redirect('/closet');
						});
					});
				}
			}

		});
	});
}

var updateUser = function(user, closet) {
	models.User.findByIdAndUpdate(user[0]._id, {closet: closet}, function (err, user) {
		user.save(function(err) {
			res.redirect('/closet');
		});
	});
}