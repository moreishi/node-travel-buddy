const Joi = require('joi');
const mongoose = require('mongoose');
const Picture = require('../model/picture.js');
const express = require('express');
const router = express.Router();

// Pictures

router.get('/', async (req,res) => {
    const pictures = Picture.find({});
    res.status('/api/pictures').send('Pictures');
});

router.post('/', async (req,res) => {

	let {error} = validate(req.body);
	if(error) return res.status(400).send(error);

	let user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	await user.save();

	res.send(user);

});

function validate(args) {
	let schema = {
		uri: Joi.string().required().min(5).max(255),
		alt: Joi.string().required().min(5).max(255),
	};
	return Joi.validate(args, schema);
}

module.exports = router;