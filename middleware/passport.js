var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;

var INSTAGRAM_CLIENT_ID = "eb7e1f33c2de4d73a6473d0580953a32"
var INSTAGRAM_CLIENT_SECRET = "6b1b68f0ef9d4d3792192e2f70f4f054"

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Instagram profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Instagram account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

module.exports = passport;