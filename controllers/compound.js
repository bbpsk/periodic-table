const log = require('loglevel');
const Compound = require('../models/Compound');
const { getElementsBySymbols } = require('./element');
const { escapeRegExp } = require('../utils/helpers');

const addCompound = async (compound) => {
    try {
        const newComp = new Compound(compound);
        const compoundsElements = await getCompoundElements(newComp.molecularFormula);
        newComp.elements = compoundsElements;
        log.info(newComp);
        await newComp.save();
        return {status: 201, message:`Compound successfully created`}
    } catch (err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}

const deleteCompound = async (id) => {
    try {
        const deleted = await Compound.findByIdAndDelete(id);
        log.info(deleted);
        return {status: 200, message:`Compound successfully deleted`}
    } catch (err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}

const getAllCompounds = async (order='asc', limit=0, search="") => {
    if(isNaN(parseInt(limit)) || limit < 0){
        log.error('invalid limit');
        throw {status: 400, message: 'invalid limit'}
    }
    if(!(order === 'asc' || order === 'desc')){
        log.error('invalid order');
        throw {status: 400, message: 'invalid order'}
    }
    const escapedString = escapeRegExp(search);
    try {
        const compounds = await Compound
        .find({ name: { $regex: escapedString,  $options: "i"} })
        .sort({molecularFormula: order})
        .limit(limit)
        return compounds;
    } catch(err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}

const getCompoundsByFormula = async (formula) => {
    try {
        const compounds = await Compound
        .find({ molecularFormula: formula })
        .populate({ 
            path: 'elements',
            populate: {
              path: 'element',
              model: 'Element',
            } 
         });
        if(compounds.length == 0) throw {status: 404, message: "could not find element"}
        return compounds;
    } catch(err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}

const getCompoundById = async (id) => {
    try {
        const compound = await Compound
        .findById(id)
        .populate({ 
            path: 'elements',
            populate: {
              path: 'element',
              model: 'Element',
            } 
         });
        if(!compound) throw {status: 404, message: "could not find element"}
        return compound;
    } catch(err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}

const getCompoundElements = async (formula) => {
    try {
       const elementsWithNum = formula.split(/(?=[A-Z])/);
       const elementSymbols = elementsWithNum.map(element => element.replace(/[0-9]/g, ""));
       const databaseElements = await getElementsBySymbols(elementSymbols);
       const fullElements = elementsWithNum.map((element) => {
        const num = element.replace(/[^0-9]/g, "");
        const symbol = element.replace(/[0-9]/g, "");
        const elementId = databaseElements.find(element => element.symbol === symbol)?.id;
        return {count: num || '1', element: elementId};
       });
       return fullElements;
    } catch(err) {
        log.error(err);
        throw {status: 500, message: err.toString()};
    }
}

module.exports = {
    addCompound, deleteCompound, getAllCompounds, getCompoundById, getCompoundsByFormula
}