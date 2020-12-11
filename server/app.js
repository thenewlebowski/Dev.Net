const cors = require('cors'),
      express = require('express'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      bodyParser = require('body-parser');
      



let createError = require('http-errors');
let logger = require('morgan');


//Require Routes
let indexRouter    = require('./routes/index');
let usersRouter    = require('./routes/users');
let imageRouter    = require('./routes/uploads');
let profileRouter  = require('./routes/profile');
let homePageRouter = require('./routes/homepage');
let authRouter     = require('./routes/auth/auth');
let discussRouter  = require('./routes/discussions');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:false}))
app.use('/uploads', express.static('uploads'));
require('dotenv').config({ debug: process.env.DOTENV_DEBUG });

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//Connect to DB
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully')
});

//PASSPORT MIDDLEWARE
app.use(passport.initialize());

//PASSPORT CONFIG
require('./config/passport')(passport);

//=======SETTING ROUTES=======//
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/p', profileRouter);
app.use('/api/image', imageRouter);
app.use('/api/discuss', discussRouter);
app.use('/api/homepage', homePageRouter);

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
  res.json({error: err});
});

module.exports = app;
