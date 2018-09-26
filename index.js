const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./startup/db')();
require('./startup/routes')(app);

app.listen(3000, () => { console.log('Listening to port 3000'); })