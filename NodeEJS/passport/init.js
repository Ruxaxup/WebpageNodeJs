var login   =  require('./login');
var signup  =  require('./signup')
var User    =  require('../model/User');

module.exports = function(passport){
  //Serializar la clase User para login persistente
  passport.serializeUser((user, done)=>{
    console.log('serializing user: ');
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser((id, done)=>{
    User.findByID(id, (err, user)=>{
      console.log('deserializing user: ',user);
      done(err, user);
    });
  });

  //Configurando estrategias para Login y Registro
  login(passport);
  signup(passport);
}
