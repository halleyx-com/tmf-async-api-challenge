const { switchDB, getDBModel } = require("../switchDb");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
let path = require("path");
const PartySchema = require("../Models/TMF632 Party Management/partyModel");
const { isValidToken } = require("../Services/tokenBlockListerServices");
const PartySchemas = new Map([["party", PartySchema]]);
let LocalStrategy = require("passport-local").Strategy;
let validPassword = require("../Utils").validPassword;

let customFields = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const verifyCallback = async (req, username, password, done) => {
  const companyDB = await switchDB("Halleyx", PartySchemas);
  const userModel = await getDBModel(companyDB, "party");
  // const found = await userModel.find()
  const found = await userModel.findOne({ email: username });
  if (!found) {
    return done(null, false);
  }
  const isValid = validPassword(password, found.hash, found.salt);
  if (isValid) {
    return done(null, found);
  } else {
    return done(null, false);
  }
};

const localStrategy = new LocalStrategy(customFields, verifyCallback);

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer'),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};
// app.js will pass the global passport object here, and this function will configure it
let jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
  console.log("🚀 ~ jwt_payload:", jwt_payload);
  // throw new Error(jwt_payload)
  try {
    console.log("📄",options.jwtFromRequest);
    // We will assign the `sub` property on the JWT to the database ID of user

    const companyDB = await switchDB(jwt_payload.company, PartySchemas);
    const userModel = await getDBModel(companyDB, "party");
    // const found = await userModel.find()
    const user = await userModel.findOne({ email: jwt_payload.sub });
    // const user = await userModel.find();
    // User.findOne({ _id: jwt_payload.sub }, function (err, user) {
    // This flow look familiar?  It is the same as when we implemented
    // the `passport-local` strategy
    // // console.log("1st 🤞");
    if (user) {
      // // console.log("1st",user);
    if(jwt_payload && jwt_payload.quoteLogin){
           return done(null, {...user,...jwt_payload});
    }
      return done(null, user);
    } else {
      console.log("2st");
      return done(null, null);
    }
  } catch (error) {
  console.log("🚀 ~ error:", error)
  }
});

module.exports = {
  localStrategy,
  jwtStrategy,
};
