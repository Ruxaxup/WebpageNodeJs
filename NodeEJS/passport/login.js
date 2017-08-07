var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../model/User');
var bCrypt          = require('bcrypt-nodejs');

module.exports  = function(passport){
  passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done){
    //Verifica si en mongo existe un usuario con ese nombre
    User.findOne({'username' : username} ,
      (err, user) => {
        if(err){
          return done(err);
        }
        //Si el Usuario no existe, loggeamos el error y regresamos
        if(!user){
          console.log('User Not Found with username '+username);
          return done(null, false, req.flash('message', 'User Not Found'));
        }
        //Si el Usuario existe pero la contraseña es incorrecta
        if(!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, req.flash('message', 'Invalid Password'));
        }
        //Usuario y contraseña correctos, regresa Usuario
        return done(null, user);
      }
    );
  })
);

  var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  }
}
