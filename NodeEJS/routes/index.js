var User    = require('../model/user');

module.exports = function (app, passport) {
  //Página de inicio
  app.get('/', (req, res)=> {
    console.log('Enum types: ');
    var array = User.schema.path('accType').enumValues;
    console.log(array.length);
    res.render('pages/index.ejs');
  });

  app.get('/pre-signup', (req, res)=> {
    res.render('pages/pre_signup.ejs');
  });

  //Login Form
  app.get('/login', (req, res)=> {
    res.render('pages/login.ejs', { message: req.flash('loginMessage') });
  });

  //Procesar el formulario del login
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  //Formulario de Registro
  app.get('/signup', (req, res)=> {
    res.render('pages/signup.ejs', { message: req.flash('signupMessage') });
  });

  //Procesar formulario de Registro

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));


  //Perfil
  //Se protege para que el usuario acceda al iniciar sesión solamente
  //Se verifica con la funcion isLoggedIn
  app.get('/profile', isLoggedIn, (req, res)=> {
    res.render('pages/profile.ejs', {
      user: req.user
    });
  });

  //Salir de la sesión
  app.get('/logout', (req, res)=> {
    req.logout();
    res.redirect('/');
  });
};

//Funcion del middleware para asegurar que el usuario ha iniciado sesion
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}
