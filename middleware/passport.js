var InstagramStrategy = require('passport-instagram').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User =  require('../models/userModel');

var INSTAGRAM_CLIENT_ID = "a7f327fff3e74aa186527f70a8e1cef3";
var INSTAGRAM_CLIENT_SECRET = "065a7a61fdd34792a869d37013c1e490";


// expose this function to our app using module.exports
module.exports = function(passport) {

  passport.serializeUser(function (user, done) {
    console.log('here', user);
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      User.findOne({email: email}, function (err, user) {
        if (err)
          return done(err);
        // if no user is found, return the message
        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (user.password !== password)
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata


        // req.session.authenticated = true;
        // req.authenticated = true;
        done(null, user);
        console.log(req.isAuthenticated());

      })
    }
      ));

  passport.use('instagram', new InstagramStrategy({
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
          return done(null, user);
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
              return done(null, user);
            }
          });
        }
      });

      console.log(profile, "here");
    }
  ));
}