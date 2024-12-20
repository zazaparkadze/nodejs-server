const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    if (allowedOrigins.includes(req.headers.orogin)) {
        res.header('Access-Control-Allow-Credentials', true);
    };
    next();
}

module.exports = credentials;