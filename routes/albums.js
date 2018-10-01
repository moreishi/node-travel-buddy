const Joi = require('joi');
const mongoose = require('mongoose');
const Album = require('../model/album.js');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const albums = await Album.find();
    res.status(200).send(albums);
});

router.get('/:id', async (req,res) => {
    const objectId = validateObjectId(req.params.id);
	if(!objectId) return res.status(404).send('Invalid album id');

	const album = await Album.findById(req.params.id);
    res.status(200).send(album);
});

router.post('/', async (req,res) => {

	let {error} = validate(req.body);
	if(error) return res.status(400).send(error);

	let album = new Album({
		name: req.body.name,
        isPrivate: req.body.isPrivate
	});
	await album.save();

    res.send(album);
    
});

router.put('/:id', async (req,res) => {

	const objectId = validateObjectId(req.params.id);
	if(!objectId) return res.status(404).send('Invalid album id');

	let album = await Album.findOne({_id: req.params.id});
	if( !album ) return res.status(404).send('No result found');

	album = await Album.findByIdAndUpdate(req.params.id,{
		name: req.body.name,
        isPrivate: req.body.isPrivate
	});

	res.status(200).send(album);
});

router.delete('/:id', async (req,res) => {

	const objectId = validateObjectId(req.params.id);
	if(!objectId) return res.status(404).send('Invalid album id');

	const album = await Album.findByIdAndRemove(req.params.id);
    res.status(200).send(album);
});

function validate(args) {
	let schema = {
        name: Joi.string().required().min(5).max(255),
        isPrivate: Joi.boolean()
	};
	return Joi.validate(args, schema);
}

function validateObjectId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}

module.exports = router;