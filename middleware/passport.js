var InstagramStrategy = require('passport-instagram').Strategy;
var User =  require('../models/userModel');

var INSTAGRAM_CLIENT_ID = "a7f327fff3e74aa186527f70a8e1cef3";
var INSTAGRAM_CLIENT_SECRET = "065a7a61fdd34792a869d37013c1e490";


// expose this function to our app using module.exports
module.exports = function(passport) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new InstagramStrategy({
      clientID: INSTAGRAM_CLIENT_ID,
      clientSecret: INSTAGRAM_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/instagram/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      User.findOne({instagram_id: profile.id}, function (err, user) {
        if (err) {
          console.log(err);
        }

        if (!err && user != null) {
          done(null, user);
        } else {
          var name = profile.name;
          user = new User({
            instagram_id: profile.id,
            firstName: name.givenName === undefined ? profile.displayName : name.givenName,
            lastName: name.familyName === undefined ? profile.username : name.familyName
          });
          user.save(function (err) {
            if (err) {
              console.log(err);  // handle errors!
            } else {
              console.log("saving user ...");
              done(null, user);
            }
          });
        }
      });

      console.log(profile, "here");
    }
  ));
}