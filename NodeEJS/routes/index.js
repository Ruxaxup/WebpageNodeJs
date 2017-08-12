'use strict'

var User = require('../model/user');
var Membership = require('../model/membership')
var userController = require('../controllers/user');

module.exports = function(app, passport) {
  //Página de inicio
  app.get('/', (req, res) => {
    res.render('pages/index.ejs',{
      user: req.user
    });
  });

  app.get('/pre-signup', (req, res) => {
    res.render('pages/pre_signup.ejs');
  });

  /****************************************************
   *******  PASSPORT CONTROLLER   **********************
   *****************************************************/
  //Login Form
  app.get('/login', (req, res) => {
    res.render('pages/login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  //Procesar el formulario del login
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  //Formulario de Registro
  app.get('/signup/:type', (req, res) => {
    console.log(req.params.type);
    res.render('pages/signup.ejs', {
      message: req.flash('signupMessage'),
      user: req.user,
      type: req.params.type
    });
  });

  //Procesar formulario de Registro
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  }));


  //Perfil
  //Se protege para que el usuario acceda al iniciar sesión solamente
  //Se verifica con la funcion isLoggedIn
  app.get('/profile', isLoggedIn, userController.loadProfile);

  //Salir de la sesión
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
};

//Funcion del middleware para asegurar que el usuario ha iniciado sesion
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
