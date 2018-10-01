const mongoose = require('mongoose');
const SchemaType = mongoose.Schema.Types;

var Visit = mongoose.model('Visits', new mongoose.Schema({ 
	visitor: { type: SchemaType.ObjectId, ref: 'User' },
    user: { type: SchemaType.ObjectId, ref: 'User' },
    views: SchemaType.Number,
    created_at: { type: SchemaType.Date, default: Date.now() },
    updated_at: { type: SchemaType.Date, default: Date.now() }
}));

module.exports = Visit;