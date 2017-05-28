var db = require('../models');

var CartController = {
  addToCart: function(req, res){
    console.log(req.body);
    var email = req.session.passport.user.email;
    var cartObject = req.body;
    var Cart = {
      description: cartObject.description,
      image_url: cartObject.image_url,
      price: cartObject.price,
      product_type: cartObject.product_type,
      selectedPackage: cartObject.selectedPackage
    };
    db.User
      .findOne({email: email}, function (err, user) {
        if(user) {
          user.cart.push(Cart);
          user.save(function (err) {
            res.status(201).send({
              message: "Item added to Cart",
              success: true,
              cart: user.cart.length
            });
            if (err) return err;
          });
        }
      });
  },

  getCart: function (req, res) {
    var email = req.session.passport.user.email;
    db.User.findOne({email: email}, function (err, user) {
      if(user){
        if (user.cart.length > 0 ) {
          res.status(200).send({
            message: "Cart Items",
            cart: user.cart
          });
        } else {
          res.status(404).send({
            message: "Cart Empty"
          });
        }
      }
    });
  },
  removeCart: function (req, res) {
    
  }
};
module.exports = CartController;