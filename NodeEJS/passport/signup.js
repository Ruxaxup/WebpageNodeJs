var LocalStrategy = require('passport-local').Strategy;
var User          = require('../model/User');
var bCrypt = require('bcrypt-nodejs');

module.exports  = function(passport){
  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done){
    findOrCreateUser = function(){
      User.findOne({'username' : username }, (err, user)=>{
        if(err){
          console.log('Error in SignUp: ' + err);
          return done(err);
        }
        //Si ya existe
        if(user){
          console.log('User already exists with username: '+username);
          return done(null, false, req.flash('message','User Already Exists'));
        }else{
          //Si no hay un usuario con ese email, se crea
          var newUser = new User();
          //Establecemos credenciales
          newUser.username  = username;
          newUser.password  = createHash(password);
          newUser.email     = req.param('firstName');
          newUser.lastName  = req.param('lastName');

          //Guardamos el usuario
          newUser.save((err)=>{
            if(err){
              console.log('Error in saving user: '+err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        }
      });
    };
    process.nextTick(findOrCreateUser);
  })
);
  var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

}//finFunction
