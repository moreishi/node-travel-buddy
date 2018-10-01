const config = require('config');
const express = require('express');
const app = express();

if(!config.get('JWT_PRIVATE_KEY')) {
    console.error('JWT_PRIVATE_KEY is not define.');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./startup/db')();
require('./startup/routes')(app);

app.listen(3000, () => { console.log('Listening to port 3000'); })