var data = require("../data.json");

exports.view = function(req, res) {  
	var name = req.query.name;
	var description = req.query.description;
	var newFriend = {
		"name": name,
		"description": description,
		"imageURL": "http://lorempixel.com/300/300/people"
	};
	console.log(newFriend);
	data["friends"].push(newFriend);
	res.render('add', newFriend);
}