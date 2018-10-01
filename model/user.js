const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
	name: String, 
	email: String,
	password: String,
	avatar: String,
});

userSchema.methods.generateAuthToken = function() {
	return jwt.sign({ name: this.name, email: this.email },config.get('JWT_PRIVATE_KEY'));
}

var User = mongoose.model('User', userSchema);

module.exports = User;