var LocalStrategy = require('passport-local').Strategy;
var User        = require('../model/user');
var Membership  = require('../model/membership');
module.exports  = function (passport) {
  //Serializar el usuario

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });

  //Registro local

  passport.use('local-signup', new LocalStrategy({
      //Por default, Local Strategy usa un usuario y contraseña
      //Se puede cambiar por lo que deseemos como el email.
      usernameField: 'email',
      passwordField: 'memberId',
      passReqToCallback: true
    },
  function (req, email, password, done) {
    //Usuario.findOne no hara nada hasta que la informacion se envíe de regreso
    process.nextTick(()=> {
      //Revisamos si el usuario existe
      User.findOne({ 'email':email }, function (err, user) {
        //Si hay algún error lo regresamos
        if (err) {
          return done(err);
        }

        //Verificamos si hay un usuario con ese email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          //Si no existe, lo creamos
          var newUser = new User();
          var memberId = req.body.memberID;
          //Asignamos credenciales
          newUser.name = req.body.name;
          newUser.dadLastName = req.body.dadLastName;
          newUser.momLastName = req.body.momLastName;
          newUser.birthday = req.body.birthday;
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.cellphone = req.body.cellphone;
          newUser.cp  = req.body.cp;
          if (memberId) {
            //Creamos la membresia
            var newMember = new Membership();
            newMember.memberId = memberId;
            newMember.user = newUser._id;
            newMember.startDate = Date.now();
            newMember.expiringDate = Date.now();
            newMember.expiringDate = new Date(
              newMember.expiringDate.setTime(newMember.startDate.getTime() + 365 * 86400000));
            console.log(newMember);

            //Guardamos la membresia
            newMember.save((err)=> {
              if (err) {
                throw err;
              }

              newUser.membership = newMember._id;

              //save the userSchema
              newUser.save(function (err) {
                if (err) {
                  throw err;
                }

                return done(null, newUser);
              });
            });
          } else {
            //save the userSchema
            newUser.save(function (err) {
              if (err) {
                throw err;
              }

              return done(null, newUser);
            });
          }
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({ 'email':email }, function (err, user) {
      if (err) {
        return done(err);
      }

      //si no se encuentra el usuario, regresa un mensaje
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found'));
      }

      //si el usuario se encontró, pero el password es incorrecto
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Opps! Wrong password'));
      }

      return done(null, user);
    });//findOne
  }//finCallback
));//passport.use

}; //fin Exports
