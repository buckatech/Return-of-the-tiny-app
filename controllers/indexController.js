const db = require('../server/urlDB');
const users = require('../server/userDB');
const helpers = require('../helpers/functions');
const genRang = helpers.rng;
const checkExist = helpers.checkExist;
const isEmpty = helpers.isEmpty;
const checkLogin = helpers.checkLogin;
const bcrypt = require('bcrypt');

// Hello
exports.render_homepage = (req, res) => {
  res.render('index', {cookie: req.cookies['userID']});
};

exports.render_JSON = (req, res) => {
  res.send(db);
};

exports.render_id = (req, res) => {
  shortURL = req.params.shortURL;
  res.redirect(db[shortURL]);
};

exports.render_register = (req, res) => {
  res.render('register', {cookie: req.cookies['userID']});
};
/* TODO better 400 handling */
exports.post_register = (req, res) => {
  rng = genRang();
  email = req.body.email;
  pass = req.body.password;
  req.session.userID = rng;
  if (isEmpty(email, pass) === 'red') {
    res.send('400');
  } else if (checkExist(users, email)) {
    res.send('400');
  } else {
    users[rng] = {id: rng, email: email, password: bcrypt.hashSync(pass, 10)};
    console.log(users)
    res.redirect('/urls');
  }
};

exports.render_login = (req, res) => {
  res.render('login', {cookie: req.cookies['userID']});
};
/* TODO better 400 handling */
exports.post_login = (req, res) => {
  if (checkLogin(users, req.body) === undefined) {
    res.send('400');
  } else {
    req.session.userID(checkLogin(users, req.body));
    res.redirect('/urls');
  }
};

exports.post_logout = (req, res) => {
  res.clearCookie('userID');
  res.redirect('/urls');
};

