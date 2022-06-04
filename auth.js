const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./models/user.model");
require("dotenv");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
console.log("env: ", process.env);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://payment-split-web-app-backend.herokuapp.com/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({ id: profile.id });
        // if user exists return the user
        console.log(existingUser);
        if (existingUser) {
          return done(null, existingUser);
        }
        // if user does not exist create a new user
        console.log("Creating new user...");
        console.log(profile);
        const newUser = new User({
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          img: profile.picture,
        });

        console.log("Creating new user...", newUser);
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
