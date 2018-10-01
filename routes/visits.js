const mid_auth = require('../middleware/auth');
const _ = require('lodash');
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../model/user');
const Visit = require('../model/visit');
const express = require('express');
const router = express.Router();

router.get('/',mid_auth,async (req,res) => {
	const visitors = await Visit.find()
		.populate('user','name email _id')
		.populate('visitor','name email _id');
	res.send(visitors);
});

router.post('/',mid_auth,async (req,res) => {
	
	let profileId = validateObjectId(req.body.profileId);
	if(!profileId) return res.status(401).send('Invalid profile id');

	profileId = Visit.find({ _id: profileId });
	if(!profileId) return res.status(401).send('Invalid profile id');

	const visit = new Visit({
		visitor: req.body.profileId,
		user: req.user._id
	});

	await visit.save();

	res.send(visit);

});

function validate(args) {
	let schema = {
		name: Joi.string().required().min(5).max(255),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
		email: Joi.string().required().email(),
		avatar: Joi.string().required()
	};
	return Joi.validate(args, schema);
}

function validateObjectId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}

module.exports = router;