//section 1 npm download packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var db = require('./models');
var path = require("path");
var logger = require("morgan");
require("./models/userModel");


var passport = require('passport');
require('./middleware/passport')(passport);

var port = process.env.PORT || 8000;

//section 2 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/")))
app.use(logger("dev"));

app.use(passport.initialize());
app.use(passport.session());

var filePath = __dirname;
require('./routes/route')(app, passport, filePath, path);

//app is listening at this port
app.listen(port, function () {
	console.log("Server is listening on port: " + port)
});