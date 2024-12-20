const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (message, fileName) => {

  let dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  let logMsg = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(path.join(__dirname, "..", "logs", fileName), logMsg);
  } catch (err) {
    if (err) throw err;
  }
};

const logger = (req, res, next) => {
    logEvents(req.url + ' ' + req.method + ' ' + req.headers.origin, `${req.method}request.txt`);
    next();
}

module.exports = { logEvents, logger };