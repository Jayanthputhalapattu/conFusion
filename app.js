var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url);
var FileStore = require('session-file-store')(session)
var passport = require('passport');
var authenticate = require('./authenticate')

connect.then((db)=>{
  console.log("connected to the DB SUCCESFULLY");
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter')
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('1234-5678-01234'));

app.use(session({
  name :'session-id',
  secret :'1234-5678-01234',
  saveUninitialized :false,
  resave:false,
  store: new FileStore()
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);


function auth(req,res,next){
      console.log(req.user);
      if (!req.user){
        var err = new Error("You are not auhenticated");
        err.status = 403;
        next(err);
      }
     else{
       next();
     }
}


app.use(auth);
app.use(express.static(path.join(__dirname + 'public')));


app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
