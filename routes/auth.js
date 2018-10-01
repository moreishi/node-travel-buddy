const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {

    let user = await User.findOne({ email: req.body.email });
    if( !user ) return res.status(404).send('Invalid username or password.');

    const validatePW = await bcrypt.compare(req.body.password,user.password);
    if( !validatePW ) return res.status(404).send('Invalid username or password.');

    const token = user.generateAuthToken();
    res.status(200).send(token);

});

module.exports = router;