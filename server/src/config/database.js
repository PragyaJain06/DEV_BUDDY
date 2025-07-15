const mongoose = require("mongoose");

const connectToDb = async () => {
  await mongoose.connect(process.env.DATABASE_CONNECT);
};

module.exports = connectToDb;
