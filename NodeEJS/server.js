var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 8080;
//var routes = require('./routes/index');
var path = require('path');
var passport = require('passport');
var expressSession = require('express-session');
var logger = require('morgan');
var dbConfig = require('./config/database.js');
var mongoose = require('mongoose');
var flash = require('connect-flash');

//Establecemos la conexion a la base de datos
mongoose.connect(dbConfig.url);

//Establecemos la ruta de la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));
//Definimos que utilizaremos 'ejs' como motor para visualización
app.set('view engine', 'ejs');

app.use(logger('dev'));
//Colocamos la carpeta 'public' visible en las direcciones
app.use(express.static(__dirname + '/public'));
//Configuramos una herramienta para parsear información en formato JSON
app.use(bodyParser.json());
//Configuramos una herramienta para parsear información del método POST
app.use(bodyParser.urlencoded({ extended: false }));

//Configuración de 'passport' para autenticar usuarios en la página
require('./config/passport')(passport)
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //Mensajes almacenados en la sesion

//Definimos las rutas pertenecientes a la dirección principal 'localhost:<port>/'
var routes = require('./routes/index')(app, passport);
//app.use('/', routes);
//Definimos el comportamiento cuando no se encuentra una página solicitada
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

//require('./routes/index.js')(app); // load our routes and pass in our app and fully configured passport

app.listen(port, () =>{
  console.log('Magic happens in port 8080')
});
