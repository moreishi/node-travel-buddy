const mongoose = require('mongoose');

module.exports = function () {
	mongoose.connect('mongodb://localhost:27017/travelbuddy')
			.then(() => {
				console.log('Connected to mongodb...');
			});
}