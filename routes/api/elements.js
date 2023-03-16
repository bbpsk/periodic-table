const express = require('express');
const router = express.Router();
const { addElements, getAllElements, getElementByNumber, getElementsByGroup, deleteElements } = require('../../controllers/element');

//clear database and then add all elements to database (resets database)
router.post('/', async (req, res) => {
    try {
        const added = await addElements();
        res.status(added.status).json(added.message);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
});

//delete all elements, clearing the database
router.delete('/', async (req, res) => {
    try {
        const deleted = await deleteElements();
        res.status(deleted.status).json(deleted.message);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
})

//get a list of all elements in the database
router.get('/', async (req, res) => {
    try {
        const elements = await getAllElements(req.query.order, req.query.limit);
        res.status(200).json(elements);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
})

//get an element with a specific atomic number
router.get('/:number', async (req, res) => {
    try {
        const element = await getElementByNumber(req.params.number);
        res.status(200).json(element);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
})

//get a list of elements in a specific group
router.get('/group/:group', async (req, res) => {
    try {
        const group = req.params.group.replace('-', ' ');
        const element = await getElementsByGroup(group);
        res.status(200).json(element);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
})

module.exports = router;