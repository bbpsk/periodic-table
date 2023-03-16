const express = require('express');
const router = express.Router();
const elementAPI = require('./api/elements');
const compoundAPI = require('./api/compound');

router.use('/elements', elementAPI);
router.use('/compounds', compoundAPI);

module.exports =  router;