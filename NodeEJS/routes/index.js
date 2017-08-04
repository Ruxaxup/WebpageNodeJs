var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //Parses POST
var methodOverride = require('method-override'); //manipulate POST

router.use(bodyParser.urlencoded({ extended: true}))
router.use(methodOverride( (req, res) =>{
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
      var method = req.body._method
      delete req.body_method
      return method
    }
  }
))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index');
});

router.get('/about', (req, res, next) =>{
  res.render('pages/about');
});

router.get('/login', (req, res, next) =>{
  res.render('pages/login',{message:"holi"});
});

router.post('/login', (req, res, next) =>{
  console.log(req.body.email);
  var email = req.body.email;
  var pass = req.body.pass;
  user = {
    "email":email,
    "pass" :pass
  }
  console.log(user)
  res.render('pages/login',{"user":user});
});

router.get('/newMember', (req, res, next) =>{
  res.render('pages/newMember');
});

router.post('/registerMember', (req, res, next) =>{
  console.log("Magic stuff");
});


module.exports = router;
