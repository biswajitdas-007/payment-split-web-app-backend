const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: { type: String },
    id: { type: String },
    email: { type: String },
    img: { type: String },
  },
  {
    versionKey: false,
  }
);

// const User = mongoose.model("user", userSchema);

// module.exports = User;

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
