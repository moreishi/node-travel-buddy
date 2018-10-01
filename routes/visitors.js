const Joi = require('joi');
const mongoose = require('mongoose');
const Visitor = require('../model/visitor.js');
const express = require('express');
const router = express.Router();

router.get('/me', async (req,res) => {
    const visitors = await Visitor.find({ user: userId });
    res.status(200).send(visitors);
});

router.get('/:id', async (req,res) => {
    const objectId = validateObjectId(req.params.id);
	if(!objectId) return res.status(404).send('Invalid album id');

	const visitors = await Visitor.findById(req.params.id);
    res.status(200).send(visitors);
});

router.post('/', async (req,res) => {
    
    const visitorId = validateObjectId(req.params.id);
    if(!visitorId) return res.status(404).send('Invalid user id');
    
    const userId = validateObjectId(req.params.id);
	if(!visitorId) return res.status(404).send('Invalid user id');

});

router.put('/:id', async (req,res) => {

	const objectId = validateObjectId(req.params.id);
	if(!objectId) return res.status(404).send('Invalid album id');

	let visitor = await Visitor.findOne({_id: req.params.id});
	if( !visitor ) return res.status(404).send('No result found');

	visitor = await Visitor.findByIdAndUpdate(req.params.id,{
		name: req.body.name,
        isPrivate: req.body.isPrivate
	});

	res.status(200).send(visitor);
});

router.delete('/:id', async (req,res) => {

	const objectId = validateObjectId(req.params.id);
	if(!objectId) return res.status(404).send('Invalid album id');

	const visitor = await Visitor.findByIdAndRemove(req.params.id);
    res.status(200).send(visitor);
});

function validate(args) {
	let schema = {
        visitor: args.visitorId,
        user: args.userId,
        views: args.view
	};
	return Joi.validate(args, schema);
}

function validateObjectId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}

module.exports = router;