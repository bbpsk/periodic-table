const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompoundSchema = new Schema({
    molecularFormula: {type: String, required: true},
    name: {type: String},
    molecularWeight: {type: Number},
    elements: [{
        count: {type: Number, required: true},
        element: {type: Schema.Types.ObjectId, ref: 'Element'}
    }]
});

const Compound = mongoose.model('Compound', CompoundSchema);

module.exports = Compound;