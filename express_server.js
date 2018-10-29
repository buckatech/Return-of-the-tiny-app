// External Modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');

// Set port 8080
const PORT = 8080;

// Router Imports
const indexRouter = require('./routes/index');
const urlsRouter = require('./routes/urls');

// Creates an express application
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// logger, Parser, and File Serving
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Compress Routes
app.use(compression());

// Use Router
app.use('/', indexRouter);
app.use('/urls', urlsRouter);


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

// Connect to default port
app.listen(PORT, () => {
  console.log(`App spining up on port ${PORT}!`);
});
