var db = require('../models');

var UserController = {
  createUser: function(req, res) {
    var user = new db.User({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      state: req.body.state,
      address: req.body.address
    });
    db.User
      .findOne({email: req.body.email}, function (err, existingUser) {
        if (!existingUser) {
          user.save(function (err) {
            res.status(201).send({
              message: "user successfully signed up",
              success: true
            })
            if (err) return err;
          });
        } else {
          res.status(409).send({
            message: "user exists",
            success: false
          })
        }
      });
  }
};

module.exports = UserController;