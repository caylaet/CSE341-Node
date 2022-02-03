const { rawListeners } = require('../models/user');
const User = require('../models/user');

exports.getLogin= (req, res, next) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    User.findById('61f1ee831afb9f1cb5b49202')
    .then(user => {
      req.session.user = user;
      req.session.save((err) => {
          console.log(err);
          res.redirect('/');
      })
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) =>{
        console.log(err);
    res.redirect('/');
    });
};