const users = require('../routes/users');
const home = require('../routes/home');

module.exports = function(app) {
	app.use('/', home);
	app.use('/api/users', users);
}