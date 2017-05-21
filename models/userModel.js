var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var ObjectId = Schema.Types.ObjectId;


var cartSchema = new Schema({
    
    
});


var userSchema = new Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email:{
        type: String,
        // required: true
    },
    password:{
        type: String
        // required: true
    },
    state: {
        type: String
    },
    address: {
        type: String
    },
    instagram_id: {
        type: Number
    },
    facebook_id: {
        type: Number
    }
})
module.exports = mongoose.model("User", userSchema);