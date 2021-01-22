let cookieParser = require('cookie-parser');
let createError = require('http-errors');
let express = require('express');
let cors = require('cors');
let path = require('path');
require('dotenv').config();

let postRouter  = require( './routes/post');
let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/post', postRouter); //all post related routes are located here

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
