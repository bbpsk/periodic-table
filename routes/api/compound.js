const express = require('express');
const router = express.Router();
const { getAllCompounds, addCompound, deleteCompound, getCompoundById, getCompoundsByFormula, updateCompound } = require('../../controllers/compound');

router.get('/', async (req, res) => {
    try {
        const {order, limit, search} = req.query;
        const compounds = await getAllCompounds(order, limit, search);
        res.status(200).json(compounds);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
});

router.get('/formula/:formula', async (req, res) => {
    try {
        const formula = req.params.formula;
        const compounds = await getCompoundsByFormula(formula);
        res.status(200).json(compounds);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const add = req.body;
        const compounds = await addCompound(add);
        res.status(200).json(compounds);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const compound = await getCompoundById(id);
        res.status(200).json(compound);
    }catch (err) {
        res.status(err.status).json(err.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const compound = req.body;
        const result = await updateCompound(id, compound);
        res.status(200).json(result);
    }catch (err) {
        res.status(err.status).json(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await deleteCompound(id);
        res.status(deleted.status).json(deleted.message);
    } catch (err) {
        res.status(err.status).json(err.message);
    }
});

module.exports = router;