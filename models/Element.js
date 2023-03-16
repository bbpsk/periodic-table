const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ElementSchema = new Schema({
    symbol: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    atomicNumber: {type: Number, required: true, unique: true},
    chemicalGroup: {type: String}
});

const Element = mongoose.model('Element', ElementSchema);

module.exports = Element;