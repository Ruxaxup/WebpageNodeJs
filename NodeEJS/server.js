'use-strict'
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 8080;

//Establecemos la conexion a la base de datos
console.log("Connecting to the database");
const user = dbConfig.mongoUser;
const pass = dbConfig.mongoPass;
const host = dbConfig.mongoHost;
const mongoPort = dbConfig.mongoPort;

let uri = `mongodb://${user}:${pass}@${host}:${mongoPort}`;
if (dbConfig.mongoDatabase) {
  uri = `${uri}/${dbConfig.mongoDatabase}`;
}
console.log(`MONGO URI: ${uri}`)
//mongoose.connect(uri);
mongoose.connect(uri, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`);
  }
  app.listen(port, () => {
    console.log('Magic happens in port 8080');
  });
});
