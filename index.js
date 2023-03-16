const express = require("express");
const cors = require("cors");
const log = require('loglevel');
require('dotenv').config();
const initConnection = require('./config/connection');

const app = express();
const port = process.env.PORT || 4200;
const level = process.env.LOG_LEVEL || 'warn';
const connection = initConnection();

app.use(express.json());
app.use(express.urlencoded({extened:  true}))
app.use(cors());
app.use('/', require('./routes'));

log.setLevel(level);

connection.once('open', () => {
    app.listen(port, () => {
        log.warn('log level', level);
        log.info(`listening on port ${port}`)
        log.debug('DB listening on ', connection._connectionString)
    });
})