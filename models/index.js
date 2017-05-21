var mongoose = require("mongoose");
var config = require("../config");
//connect to database
mongoose.Promise = global.Promise;
mongoose.set("debug", true);
mongoose.connect(config.database, function (err) {
  if (err) throw err;
  console.log("Successully connected to the database")
});

module.exports.User = require('./userModel');