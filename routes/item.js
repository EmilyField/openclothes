var models = require('../models');

exports.view = function(req, res){
	var itemID = req.query.itemID;
	var username = req.session.username;

	models.Item.findById(itemID, function(err, item) {
		models.User.find({username: username}, function(err, user) {
			if (username == item.ownedby) {
				item["mine"] = true;
			} else {
				item["mine"] = false;
			}
			item["numNotifs"] = user[0].numNotifs;
			res.render('item', item);
		});
	});
	
};

exports.like = function(req, res) {
	var id = req.body.itemID;

	models.Item.findById(id, function(err, item) {
		var likes = item.likes;
		likes++;
		models.Item.findByIdAndUpdate(item._id, {likes : likes}, function(err) {
			item.save(function(err) {
				if (err) throw err;
			});
			res.redirect('item?itemID=' + id);
		});
	});
}

// find the item that goes along with the id
// render page

/*var findItemByID = function (items, itemID) {
	for (i in items) {
		if (items[i].itemID === itemID) {
			return items[i];
		}
	}
}*/