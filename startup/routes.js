const auth = require('../routes/auth');
const visitors = require('../routes/visitors');
const albums = require('../routes/albums');
const users = require('../routes/users');
const home = require('../routes/home');

module.exports = function(app) {
	app.use('/', home);
	app.use('/api/users', users);
	app.use('/api/albums', albums);
	app.use('/api/visitors', visitors);
	app.use('/api/auth', auth);
}