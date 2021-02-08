const cors        = require('cors'),
      logger      = require('morgan'),
      express     = require('express'),
      mongoose    = require('mongoose'),
      passport    = require('passport'),
      bodyParser  = require('body-parser'),
      createError = require('http-errors'),
      seeds       = require('./seeds/seeds');

let app = express();

//Require Routes
let postRouter     = require('./routes/posts');
let indexRouter    = require('./routes/index');
let usersRouter    = require('./routes/users');
let imageRouter    = require('./routes/uploads');
let profileRouter  = require('./routes/profile');
let authRouter     = require('./routes/auth/auth');
let discussRouter  = require('./routes/discussions');

//seed database
// seeds();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:false}))
app.use('/uploads', express.static('uploads'));
require('dotenv').config({ debug: process.env.DOTENV_DEBUG });

//Connect to DB
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully')
});

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//PASSPORT MIDDLEWARE
app.use(passport.initialize());

//PASSPORT CONFIG
require('./config/passport')(passport);

//=======SETTING ROUTES=======//
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/p', profileRouter);
app.use('/api/posts', postRouter);
app.use('/api/image', imageRouter);
app.use('/api/discuss', discussRouter);

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
