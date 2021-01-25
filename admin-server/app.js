let cookieParser = require('cookie-parser');
let createError = require('http-errors');
let mongoose = require('mongoose');
let express = require('express');
let cors = require('cors');
let path = require('path');
require('dotenv').config();

const postRouter  = require( './routes/post');
const authRouter = require('./routes/auth/login');
const seed = require('./seeds/seeds.js');

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Connect to DB
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully')
});

//seed db
// seed();

app.use('/api/admin/auth', authRouter); //auth routes
app.use('/api/admin/post', postRouter); //post routes

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
  res.json({err});
});

module.exports = app;
