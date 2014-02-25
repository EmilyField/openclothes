var models = require('../models');
var fs = require('fs');
var im = require('imagemagick');


exports.view = function(req, res) {  
	var username = req.session.username;
	if (username != undefined) {
		models.User.find({username: username}, function(err, user) {
			res.render('add', {"numNotifs": user[0].numNotifs});
		});
	} else {
		res.render('accessdenied');
	}
}

exports.additem = function(req, res) {
	var username = req.session.username;
	var name = req.body.itemname;
	var brand = req.body.brand;
	var size = req.body.size;
	var imageURL = req.body.imageURL;
	var sunny = req.body.sunny;
	var clouds = req.body.clouds;
	var rain = req.body.rain;
	var snow = req.body.snow;
	var borrowable = req.body.borrowable;

	// make borrowable boolean
	if (borrowable != undefined) {
		borrowable = true;
	} else {
		borrowable = false;
	}

	//fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name;
		//var imagePath = req.files.image.path;


		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {
			//
		  var thumbPath =  "uploads/thumbs/" + imageName;

	

			im.resize({
			  srcData: fs.readFileSync(req.files.image.path, 'binary'),
			  width:   200
			}, function(err, stdout, stderr){
			  if (err) throw err
			  fs.writeFileSync(thumbPath, stdout, 'binary');
			  console.log('resized kittens.jpg to fit within 256x256px')
			});

		  	
		  		var newItem = new models.Item ({
					"name" : name,
					"brand" : brand,
					"size" : size,
					"imageURL": thumbPath,
					"likes": 0,
					"ownedby": username,
					"borrowable": borrowable,
					"borrowedby": "",
					"borrowdate": "",
					"weather": [],
					"borrowed": false
				});


				if (sunny != undefined) {
					newItem.weather.push(sunny);
				}
				if (clouds != undefined) {
					newItem.weather.push(clouds);
				}
				if (rain != undefined) {
					newItem.weather.push(rain);
				}
				if (snow != undefined) {
					newItem.weather.push(snow);
				}


			

				newItem.save(function (err) { // this is a callback
					if(err) {console.log(err); res.send(500); }
					models.User.find({username : username}, function(err, user) {
						//add item to user's closet
						var closet = user[0].closet;

						closet.push(newItem._id);
						models.User.findOneAndUpdate({username : username}, {closet : closet}, function (err, user) {
							user.save(function (err) {
								if(err) {console.log(err); res.send(500); }
								/*var itemObj = getItems(user[0]);
								console.log(itemObj);*/
								res.redirect('closet');
							});
						});
						
					});
				});
			}
}


/*var getItems = function(user) {
	var items = user.closet;
	console.log(items);
	var itemList = [];
	for (var i = 0; i < items.length; i++) {
		var item = models.Item.findById(items[i], function(err, item) {
			console.log(i);
			itemList.push(item);
		});
	}
	return {"username": user.username, "mine": true, "items": itemList};
}*/

/*
var getCloset = function(items, users, username, mine) {
	/*var user = findUsername(users, username);
	var closet = user.closet;
	var itemList = [];
	for (i in closet) {
		var item = findItemByID(items, closet[i]);
		itemList.push(item);
	}

	var itemList = [];
	for (i in items) {
		if (items[i]["ownedby"] == username) {
			itemList.push(items[i]);
		}
	}
	var itemObj = {"mine": mine, "items": itemList, "username": username};
	return itemObj;
}

var findUsername = function (users, username) {
	for (i in users) {
		console.log(users[i].username);
		if (users[i].username === username) {
			return users[i];
		}
	}
	return null;
}

var findItemByID = function (items, itemID) {
	for (i in items) {
		if (items[i].itemID === itemID) {
			return items[i];
		}
	}
	return null;
}

var checkFriends = function (users, username, other_username) {
	var user = findUsername(users, username);
	var friendsList = user.friendslist;
	for (i in friendsList) {
		if (friendsList[i] == other_username) {
			return true;
		}
	}
	return false;
}

var generateID = function() {
	var seconds = new Date().getTime().toString();
	return seconds;
}*/