const  { logEvents }  = require('./logger'); 

const errorHandler =  (err, req, res, next) => {
    //console.error(err.stack);
   //res.status(500).send(err.message);
    logEvents(err.name + ': ' + err.message, 'errorLog.txt');
    next();
}

module.exports = errorHandler;