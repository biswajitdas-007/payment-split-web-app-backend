const mongoose = require("mongoose");
require("dotenv").config();
const connect = () => {
  return mongoose.connect(
    `mongodb+srv://biswajit:1TcIGpbVkqHyJfta@cluster0.ntmczr0.mongodb.net/?retryWrites=true&w=majority`
  );
};

module.exports = connect;
