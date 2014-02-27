var models = require('../models');

exports.view = function(req, res){
	res.render('edit');
};

exports.remove = function(req, res) {
	var username = req.session.username;
	var itemID = req.query.itemID;
	models.User.find({username : username}, function (err, user) {
		var closet = user[0].closet;
		console.log(closet);
		updateClosetRec(closet, closet.length - 1, user, itemID, res);
	});

}


var updateClosetRec = function(closet, n, user, itemID, res) {
	if (n < 0) {
		console.log("item not found");
	} else if (closet[n] == itemID) {
		closet.splice(n, 1);
		n = -1;
		models.User.findByIdAndUpdate(user[0]._id, {closet: closet}, function (err, userUpdated) {
			userUpdated.save(function(err) {
				models.Item.findByIdAndRemove(itemID, function(err) {});
				res.redirect('closet');
			});
		});
	} else {
		updateClosetRec(closet, n - 1, user, itemID, res);
	}
}

var updateUser = function(user, closet, res) {
	console.log("closet is: ");
	console.log(closet);
	models.User.findByIdAndUpdate(user[0]._id, {closet: closet}, function (err, userUpdated) {
		userUpdated.save(function(err) {
		});
	});
}

//remove button
//rotating images
//get rid of weather
//fix styling
//edit bio