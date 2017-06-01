var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var cartSchema = new Schema({
  email: {
    type: String
  },
  description: {
    type: String
  },
  image_url: {
    type: String
  },
  price:{
    type: String
  },
  product_type: {
    type: String
  },
  selectedPackage: {
    type: String
  }
});
module.exports = cartSchema;