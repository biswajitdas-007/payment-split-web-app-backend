const express = require("express");
const { DataTypes } = require("sequelize");
const passport = require("passport");
const sequelize = require("../db/db.js");
const router = express.Router();

const User = require("../models/user.model");

router.get("/get-users", async function (req, res) {
  try {
    const userDomain = await User.find().lean().exec();
    return res.send(userDomain);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.post("/create-user", async function (req, res) {
  try {
    const USER = sequelize.define("user", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    sequelize
      .sync()
      .then(() => {
        console.log("User table created successfully!");
        const { name, email, password } = req.body;
        USER.create({
          username: name,
          email: email,
          password: password,
        })
          .then((response) => {
            return res.send(response);
          })
          .catch((error) => {
            console.error("Failed to create a new record : ", error);
            res.send(error);
          });
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
        return res.send(error);
      });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// router.post("/login", async function (req, res) {
//   try {
//     const check = await User.findOne({ email: req.body.email });
//     if (check) {
//       return res.send(check);
//     } else {
//       return res.send("user-not-found");
//     }
//   } catch (err) {
//     return res.status(400).send(err.message);
//   }
// });

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/auth/google/success",
//     failureRedirect: "/auth/google/failure",
//   }),
//   (req, res) => {
//     // console.log("req.user: ", req.user);
//     res.cookie("auth", req.user._id);
//     res.redirect(`https://locahost:3000`);
//   }
// );

router.get("/user", async (req, res) => {
  try {
    const user = await User.findById(req.body.id).lean().exec();
    return res.send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
