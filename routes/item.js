var data = require("../items.json");

exports.view = function(req, res){
	var itemID = req.query.itemID;
	var username = req.session.username;
	var item = findItemByID(data.items, itemID);
	if (username == item.ownedby) {
		item["mine"] = true;
	} else {
		item["mine"] = false;
	}
	res.render('item', item);
};

// find the item that goes along with the id
// render page

var findItemByID = function (items, itemID) {
	for (i in items) {
		if (items[i].itemID === itemID) {
			return items[i];
		}
	}
}