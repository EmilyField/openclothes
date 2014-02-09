var data = require("../data.json");

exports.view = function(req, res){
	var itemID = req.query.itemID;
	res.render('item', findItemByID(data.items, itemID));
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