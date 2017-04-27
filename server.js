//section 1 npm download packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var config = require("./config");
var logger = require("morgan");
//angular.module('7moods', ['ngRoute']);


//Chakra =require('./models/chakraModel');
//User = require('./models/userModel');

//var expressJwt = require("express-jwt")
var port = process.env.PORT || 8000;

//section 2 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")))
app.use(logger("dev"));

//connect to database 
mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
	if (err) throw err;
	console.log("Successully connected to the database")
});

app.get('/', function(req,res){
res.sendFile(path.join(__dirname + '/index.html'));    
    
})
app.get('*', function(req,res){
res.sendFile(path.join(__dirname + '/index.html'));    
    
})


app.get('/api/chakras', function(req,res){
    Chakra.getChakra(function(err,chakras){
        if(err){
            throw err;
        }
        res.json(chakras);
        });
    });


//app uses these apis and connects to these routes
//app.use("/api", expressJwt({
//	secret: config.secret
//}));

//app.use("/api/profile", require("./routes/profileRoutes"));
//app.use("/api/chakra", require("./routes/chakraRoutes"));
//app.use("/auth", require("./routes/authRoutes"));
//app.use("/search", require("./routes/searchRoutes"));

//app is listening at this port
app.listen(port, function () {
	console.log("Server is listening on port: " + port)
});