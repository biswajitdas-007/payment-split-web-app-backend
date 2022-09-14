// const mongoose = require("mongoose");
// require("dotenv").config();
// const connect = () => {
//   return mongoose.connect(
//     `mongodb+srv://biswajit:1TcIGpbVkqHyJfta@cluster0.ntmczr0.mongodb.net/?retryWrites=true&w=majority`
//   );
// };

// module.exports = connect;

const Sequelize = require("sequelize");
const sequelize = new Sequelize("payment_split_app", "root", "mysql@2022", {
  host: "localhost",
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
