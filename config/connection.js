const mongoose = require('mongoose');
const log = require('loglevel');

const initConnection = () => {
    mongoose.connect(process.env.DB_URI).
        catch(error => log.error('could not connect: ', error));;
    return mongoose.connection;
}

module.exports = initConnection;