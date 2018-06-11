const express = require('express');
const bodyParser = require('body-parser');
const jade = require('jade');
const mongoose = require('mongoose');
const logger = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const expressValidator = require('express-validator');
const upload = multer({ dest: 'uploads/' })

mongoose.connect('mongodb://localhost:27017/authNodejs', function (err) {
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log("database has been connected!!");
  }
})


const port = 4040;
const app = express();


app.use(express.static(__dirname+'/public'))
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'));
app.use(helmet());


//app.use(multer({dest: './uploads'}));


app.set('views', __dirname+'/views');
app.set('view engine','jade');

//handling sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))



//passport session
app.use(passport.initialize());
app.use(passport.session());



app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('/', function (req, res) {
  res.render('index')
});


app.get('/signup', function (req, res) {
  res.render('signup');
});


app.get('/login', function (req, res) {
  res.render('login');
})



app.listen(port, function (err) {
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log("server has been started!!");
  }
})