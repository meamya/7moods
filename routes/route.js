var db= require('../models/');
var fs = require('fs');
var UserController = require('../controller/userController');

module.exports = function(app, passport, filePath, path)
{
  app.get('/api/chakras', function (req, res) {
    var file = path.join(filePath + '/public/components/chakra.json');


    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      res.send(data);
    });
  });
  app.get('/api/shop', function (req, res) {
    var file = path.join(filePath + '/public/shop.json');


    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      res.send(data);
    });
  });

  // GET /auth/instagram
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Instagram authentication will involve
  //   redirecting the user to instagram.com.  After authorization, Instagram
  //   will redirect the user back to this application at /auth/instagram/callback
  app.get('/auth/instagram',
    passport.authenticate('instagram'),
    function (req, res) {
      // The request will be redirected to Instagram for authentication, so this
      // function will not be called.
    });

  // GET /auth/instagram/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/instagram/callback',
    passport.authenticate('instagram', {failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    });



  app.post('/api/signup', UserController.createUser);

  app.post('/api/signin',passport.authenticate('local-signin', {
    successRedirect : '/shop', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // check for loggedin user
  app.get("/loggedin", function(req, res) {
    console.log(req.session);
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // handle logout
  app.post("/api/logout", function(req, res) {
    req.logOut();
    res.send(200);
  })

  var file = (path.join(filePath + '/public/components/chakra.json'));

  app.get('*', function (req, res) {
    res.sendFile(path.join(filePath + '/public/index.html'));

  });
};