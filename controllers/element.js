const Element = require('../models/Element');
const elements = require('../data/elements.json');
const log = require('loglevel');
const {handleError} = require('../utils/handleError');

const addElements = async () => {
    try {
        await Element.deleteMany({});
        await Element.insertMany(elements.elements);
        return {status: 201, message:`Elements successfully added to database`}
    } catch (err) {
        handleError(err)
    }
}
const deleteElements = async () => {
    try {
        await Element.deleteMany({});
        return {status: 200, message:`Elements successfully deleted`}
    } catch (err) {
        handleError(err)
    }
}

const getAllElements = async (order='asc', limit=0) => {
    if(isNaN(parseInt(limit)) || limit < 0){
        throw {status: 400, message: 'invalid limit'}
    }
    if(!(order === 'asc' || order === 'desc')){
        throw {status: 400, message: 'invalid order'}
    }
    try {
        const elements = await Element.find().sort({atomicNumber: order}).limit(limit);
        return elements;
    } catch(err) {
        handleError(err)
    }
}
const getElementByNumber = async (number) => {
    try {
        const element = await Element.findOne({ atomicNumber: number });
        if(!element) throw {status: 404, message: "could not find element"}
        return element;
    } catch(err) {
        handleError(err)
    }
}
const getElementsBySymbols = async (symbols) => {
    try {
        const elements = await Element.find().where('symbol').in(symbols);
        return elements;
    } catch(err) {
        handleError(err)
    }
}
const getElementsByGroup = async (group) => {
    try {
        const elements = await Element.find({ chemicalGroup: {'$regex' : group, $options: 'i'} });
        return elements;
    } catch(err) {
        handleError(err)
    }
}

module.exports = {
    addElements, deleteElements, getAllElements, getElementByNumber, getElementsBySymbols, getElementsByGroup
}