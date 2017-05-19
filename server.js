//section 1 npm download packages
var fs = require('fs');
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var config = require("./config");
var logger = require("morgan");
require("./models/userModel");


//angular.module('7moods', ['ngRoute']);
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

//Chakra =require('./models/chakraModel');
//User = require('./models/userModel');

//var expressJwt = require("express-jwt")
var port = process.env.PORT || 8000;

//section 2 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/")))
app.use(logger("dev"));

app.use(passport.initialize());
app.use(passport.session());

//connect to database 
mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
	if (err) throw err;
	console.log("Successully connected to the database")
});

var User = mongoose.model("User");

app.get('/', function(req,res){
res.sendFile(path.join(__dirname + '/public/index.html'));    
    
})

app.get('/api/chakras', function(req,res){
var file = path.join(__dirname + '/public/components/chakra.json'); 
                 

    fs.readFile(file, 'utf8',function (err,data) { 
        if (err) { 
            return console.log(err); 
        } 
        res.send(data); 
        });
    });
app.get('/api/shop', function(req,res){
var file = path.join(__dirname + '/public/shop.json'); 
                 

    fs.readFile(file, 'utf8',function (err,data) { 
        if (err) { 
            return console.log(err); 
        } 
        res.send(data); 
        });
    });

function createUser(req, res){
    console.log(req.body);
    var user= new User({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        state: req.body.state,
        address: req.body.address
    });
    User
     .findOne({ email: req.body.email }, function (err, existingUser) {
        if (!existingUser) {
            user.save(function(err){
                console.log("user saved");
                res.status(201).send({
                    message: "user successfully signed up",
                    success: true
                })
                if (err) return err;
            });
        }else {
            res.status(409).send({
                message: "user exists",
                success: false
            })
        }
        });
}

// GET /auth/instagram
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Instagram authentication will involve
//   redirecting the user to instagram.com.  After authorization, Instagram
//   will redirect the user back to this application at /auth/instagram/callback
app.get('/auth/instagram',
  passport.authenticate('instagram'),
  function(req, res){
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  });

// GET /auth/instagram/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(res);
    res.redirect('/');
  });


app.post('/api/signup', createUser);
    


var file = (path.join(__dirname + '/public/components/chakra.json'));



//app uses these apis and connects to these routes
//app.use("/api", expressJwt({
//	secret: config.secret
//}));
app.get('*', function(req,res){
res.sendFile(path.join(__dirname + '/public/index.html'));    
    
})
//app.use("/api/profile", require("./routes/profileRoutes"));
//app.use("/api/chakra", require("./routes/chakraRoutes"));
//app.use("/auth", require("./routes/authRoutes"));
//app.use("/search", require("./routes/searchRoutes"));

//app is listening at this port
app.listen(port, function () {
	console.log("Server is listening on port: " + port)
});