const db = require('../server/urlDB');
const users = require('../server/userDB');
const helpers = require('../helpers/functions');
const genRang = helpers.rng;
const checkExist = helpers.checkExist;
const isEmpty = helpers.isEmpty;

// Hello
exports.render_homepage = (req, res) => {
  res.render('index');
};

exports.render_JSON = (req, res) => {
  res.send(db);
};

exports.render_id = (req, res) => {
  shortURL = req.params.shortURL;
  res.redirect(db[shortURL]);
};

exports.render_register = (req, res) => {
  res.render('register');
};
/* TODO better 400 handling */
exports.post_register = (req, res) => {
  rng = genRang();
  email = req.body.email;
  pass = req.body.password;
  res.cookie('userID', rng);
  if (isEmpty(email, pass) === 'red') {
    res.send('400');
  } else if (checkExist(users, email)) {
    res.send('400');
  } else {
    users[rng] = req.body;
    res.redirect('/urls');
  }
};

exports.render_login = (req, res) => {
  res.render('login');
};

exports.post_login = (req, res) => {
  res.cookie('userID', req.body.userName);
  res.redirect('/urls');
};

exports.post_logout = (req, res) => {
  res.clearCookie('userID');
  res.redirect('/urls');
};

