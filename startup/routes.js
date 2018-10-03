const auth = require('../routes/auth');
const visits = require('../routes/visits');
const favorites = require('../routes/favorites');
const albums = require('../routes/albums');
const users = require('../routes/users');
const home = require('../routes/home');

module.exports = function(app) {
	app.use('/', home);
	app.use('/api/users', users);
	app.use('/api/albums', albums);
	app.use('/api/visits', visits);
	app.use('/api/favorites', favorites);
	app.use('/api/auth', auth);
}