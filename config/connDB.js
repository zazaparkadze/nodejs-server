const mongoose = require("mongoose");

const connDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connDB;
