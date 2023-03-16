const Element = require('../models/Element');
const elements = require('../data/elements.json');
const log = require('loglevel');

const addElements = async () => {
    try {
        await Element.deleteMany({});
        await Element.insertMany(elements.elements);
        return {status: 201, message:`Elements successfully added to database`}
    } catch (err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}
const deleteElements = async () => {
    try {
        await Element.deleteMany({});
        return {status: 200, message:`Elements successfully deleted`}
    } catch (err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}

const getAllElements = async (order='asc', limit=0) => {
    if(isNaN(parseInt(limit)) || limit < 0){
        throw {status: 400, message: 'invalid limit'}
    }
    try {
        const elements = await Element.find().sort({atomicNumber: order}).limit(limit);
        return elements;
    } catch(err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}
const getElementByNumber = async (number) => {
    try {
        const element = await Element.findOne({ atomicNumber: number });
        if(!element) throw {status: 404, message: "could not find element"}
        return element;
    } catch(err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}
const getElementsBySymbols = async (symbols) => {
    try {
        const element = await Element.find().where('symbol').in(symbols);
        if(!element) throw {status: 404, message: "could not find element"}
        return element;
    } catch(err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}
const getElementsByGroup = async (group) => {
    try {
        const elements = await Element.find({ chemicalGroup: {'$regex' : group, $options: 'i'} });
        return elements;
    } catch(err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}

module.exports = {
    addElements, deleteElements, getAllElements, getElementByNumber, getElementsBySymbols, getElementsByGroup
}