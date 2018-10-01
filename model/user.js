const mongoose = require('mongoose');

var User = mongoose.model('User', new mongoose.Schema({ 
	name: String, 
	email: String,
	avatar: String,
}));

module.exports = User;