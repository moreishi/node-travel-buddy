const mid_auth = require('../middleware/auth');
const _ = require('lodash');
const mongoose = require('mongoose');
const Favorite = require('../model/Favorite');
const express = require('express');
const router = express.Router();

router.get('/',mid_auth,async (req,res) => {
	const favorite = await Favorite.find()
		.populate('user','name email _id')
		.populate('visitor','name email _id');
	res.send(favorite);
});

router.post('/',mid_auth,async (req,res) => {
	
	let profileId = validateObjectId(req.body.profileId);
	if(!profileId) return res.status(401).send('Invalid profile id');

	profileId = Favorite.find({ _id: profileId });
	if(!profileId) return res.status(401).send('Invalid profile id');

	const favorite = new Favorite({
		visitor: req.body.profileId,
		user: req.user._id
	});

	await favorite.save();

	res.send(favorite);

});

function validateObjectId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}

module.exports = router;