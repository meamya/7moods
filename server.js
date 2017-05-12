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


//Chakra =require('./models/chakraModel');
//User = require('./models/userModel');

//var expressJwt = require("express-jwt")
var port = process.env.PORT || 8000;

//section 2 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/")))
app.use(logger("dev"));

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
//    Chakra.getChakra(function(err,chakras){
//        if(err){
//            throw err;
//        }
//        res.json(chakras);
        });
    });

app.get('*', function(req,res){
res.sendFile(path.join(__dirname + '/public/index.html'));    
    
})

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

app.post('/api/signup', createUser);
    


var file = (path.join(__dirname + '/public/components/chakra.json'));



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