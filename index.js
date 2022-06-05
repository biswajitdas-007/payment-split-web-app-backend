const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");
const http = require("http");
require("dotenv").config();
require("./auth");

const connect = require("./db/db.js");

const userRouter = require("./controllers/user.controller");
const expenditureRouter = require("./controllers/expenditure.controller");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/login/success", (req, res) => {
  console.log("req: ", req);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.redirect(
    `https://payment-split-app-frontend.vercel.app/dashboard?id=${req.user._id}`
  );
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

// app.use("/", userRouter);
app.use("/", expenditureRouter);
app.use("/", userRouter);

server.listen(PORT, async () => {
  await connect();
  console.log("listening on port: 5000");
});
