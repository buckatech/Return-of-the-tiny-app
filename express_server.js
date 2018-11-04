// External Modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const cookieSession = require('cookie-session');


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
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(express.static(path.join(__dirname, 'public')));

// Compress Routes
app.use(compression());

// Use Router

app.use('/', indexRouter);
app.use('/urls', urlsRouter);

// Connect to default port
app.listen(PORT, () => {
  console.log(`App spining up on port ${PORT}!`);
});

module.exports = app;
