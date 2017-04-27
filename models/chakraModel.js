var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var chakraSchema = new Schema({
    Name: {
        type: String,
       required: true
    },
    color: {
        type: String,
    },
    location:{
        type: String,
    },
    description:{
        type: String,
    },
    affirmation:{
        type: String,
    }
})

module.exports = mongoose.model("chakra", chakraSchema);
module.exports =.getChakraByID(name || ObjectId, callback);


module.exports = mongoose.model("User", userSchema);