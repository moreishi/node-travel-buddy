const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../model/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
	const user = await User.find().sort('-name');
	res.send(user);
});

router.get('/:id', async (req,res) => {
	const objectId = mongoose.Types.ObjectId.isValid(req.params.id);
	if(!objectId) return res.status(404).send('Invalid user id');

	const user = await User.find({ _id: req.params.id });
	if(!user) return res.status(404).send('No result found');
	res.send(user);
});

router.post('/', async (req,res) => {

	let count = await User.count({ email: req.body.email });
	if(count > 0) return res.status(401).send('Email is already in used!');

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

router.put('/:id', async (req,res) => {

	const objectId = validateObjectId(req.params.id);
	if(!objectId) return res.status(404).send('Invalid user id');

	let user = await User.findOne({_id: req.params.id});
	if( !user ) return res.status(404).send('No result found');

	user  = await User.findByIdAndUpdate(req.params.id,{
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	res.status(200).send(user);
});

router.delete('/:id', async (req,res) => {
	const objectId = validateObjectId(req.params.id);
	if(!objectId) return res.status(404).send('User id not found.');
	const result = await User.deleteOne({ _id: req.params.id });
	res.send(result);
});

function validate(args) {
	let schema = {
		name: Joi.string().required().min(5).max(255),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
		email: Joi.string().required().email(),
	};
	return Joi.validate(args, schema);
}

function validateObjectId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}

module.exports = router;