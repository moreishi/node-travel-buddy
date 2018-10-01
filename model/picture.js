const mongoose = require('mongoose');

var Picture = mongoose.model('Picture', new mongoose.Schema({ 
	uri: String,
	alt: String
}));

module.exports = Picture;