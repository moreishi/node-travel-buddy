const mongoose = require('mongoose');

var User = mongoose.model('User', new mongoose.Schema({ 
	name: 'string', 
	email: 'string' 
}));

module.exports = User;