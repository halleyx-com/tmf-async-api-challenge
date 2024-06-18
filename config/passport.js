const PartySchema = require("../Models/TMF632 Party Management/partyModel.js");
const User = new Map([["party", PartySchema]]);

const passport = require("passport");
let { localStrategy, jwtStrategy } = require("./passportStraegies");

passport.serializeUser((user, done) => {
  console.log("🚀 ~ passport.serializeUser ~ user:", user)
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log("🚀 ~ passport.deserializeUser ~ userId:", userId)
  User.findById(userId)
    .then((user) => {
      console.log("🚀 ~ .then ~ user:", user)
      done(null, user);
    })
    .catch((err) => done(err));
});

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};
