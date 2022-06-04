const express = require("express");

const router = express.Router();

const Expenditure = require("../models/expenditure.model");
const User = require("../models/user.model");

router.get("/expenditure", async function (req, res) {
  try {
    const expenditure = await Expenditure.find().populate("user");
    return res.send(expenditure);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.post("/create-expenditure", async function (req, res) {
  try {
    console.log(req.body);
    // const { price } = req.body;
    //const splitPrice = price / 4;
    const expenditure = await Expenditure.create(req.body);

    //  const getUsers = await User.find().lean().exec();
    //  getUsers.map(async (user) => {
    //   const updateUsers = await User.updateOne(
    //     { _id: user._id },
    //     {
    //       $set: {
    //         totalDue: user.totalDue ? user.totalDue + splitPrice : splitPrice,
    //       },
    //     }
    //   );
    // });

    return res.send(expenditure);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
module.exports = router;
