var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //Parses POST
var methodOverride = require('method-override'); //manipulate POST

var isAuthenticated = function(req, res, next){
  //Si el usuario esta autenticado en la sesion, llamamos a la function
  //next() para llamar al siguiente 'Request Handler'.
  //Passport agrega este metodo al 'Request object'
  if(req.isAuthenticated()){
    return next();
  }
  //Si el usuario no está autenticado se redirecciona a la pagina de login
}

module.exports = function(passport){
  router.use(bodyParser.urlencoded({ extended: true}))
  router.use(methodOverride( (req, res) =>{
      if(req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method
        delete req.body_method
        return method
      }
    }
  ))

  router.get('/', function(req, res, next) {
    res.render('pages/index', {message : req.flash('message')});
  });

  router.get('/about', (req, res, next) =>{
    res.render('pages/about');
  });

  router.get('/login', (req, res, next) =>{
    res.render('pages/login',{message:"holi"});
  });

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));

  router.get('/register', (req, res, next) =>{
    res.render('pages/register');
  });

  router.get('/signup', (req, res)=>{
    res.render('register',{message: req.flash('message')});
  });

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/home', isAuthenticated, (req, res)=>{
    res.render('pages/home', {user: req.user});
  })

  router.get('/signout', (req, res) =>{
    req.logout();
    res.redirect('/');
  });

  return router;
}



//module.exports = router;
