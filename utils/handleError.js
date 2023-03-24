const log = require('loglevel');

const handleError = (err) => {
    log.error(err);
    const status = err.status || 500;
    const message = err.message || err.toString();
    throw {status, message};
}

module.exports = {handleError}