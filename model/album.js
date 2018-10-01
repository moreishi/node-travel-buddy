const mongoose = require('mongoose');

var Album = mongoose.model('Album', new mongoose.Schema({ 
	name: String,
	isPrivate: Boolean
}));

module.exports = Album;