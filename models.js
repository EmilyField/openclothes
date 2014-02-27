
var Mongoose = require('mongoose');




var ItemSchema = new Mongoose.Schema({
	"name": String,
	"brand": String,
	"size": String,
	"imageURL": String,
	"likes": Number,
	"ownedby": String,
	"borrowable": Boolean,
	"borrowedby": String,
	"borrowdate": Date,
	"weather": [String],
	"borrowed": Boolean
});

var NotificationSchema = new Mongoose.Schema({
	"recipient": String,
	"sender": String,
	"borrow": Boolean,
	"date": Date,
	"itemID": {type: Mongoose.Schema.Types.ObjectId, ref: 'Item'},
	"friend": Boolean,
	"itemName": String,
	"itemImage": String
});

var UserSchema = new Mongoose.Schema({
  // fields are defined here
  "username": String,
  "name": String,
  "password": String,
  "email": String,
  "friendslist": [String],
  "closet": [{type: Mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  "numNotifs": Number,
  "borroweditems": [{type: Mongoose.Schema.Types.ObjectId, ref: 'Item'}]
});


exports.Item = Mongoose.model('Item', ItemSchema);
exports.Notification = Mongoose.model('Notification', NotificationSchema);
exports.User = Mongoose.model('User', UserSchema);



/*
"friendslist": [{type: Mongoose.Schema.Types.ObjectId, ref: 'User'}],
  "closet": [{type: Mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  "notifications": [{type: Mongoose.Schema.Types.ObjectId, ref: 'Notification'}],
  "borroweditems": [{type: Mongoose.Schema.Types.ObjectId, ref: 'Item'}]
  */