const bcrypt = require('bcrypt');

const db = require('../server/urlDB');
const users = require('../server/userDB');
const helpers = require('../helpers/functions');


const genRang = helpers.rng;
const checkExist = helpers.checkExist;
const isEmpty = helpers.isEmpty;
const checkLogin = helpers.checkLogin;


// Hello
exports.render_homepage = (req, res) => {
  if (this.testVar) {
    res.render('index', {cookie: cookie});
  } else if (session) {
    res.redirect('/urls');
  } else {
    res.redirect('/login');
  }
};

exports.render_badOwnership = (req, res) => {
  res.render('badOwnership');
};
exports.render_loginErr = (req, res) => {
  res.render('loginErr');
};
exports.render_badreq = (req, res) => {
  res.render('badReq');
};
exports.render_JSON = (req, res) => {
  res.send(db);
};
/* Better 'bad' */
exports.render_id = (req, res) => {
  Object.values(db).forEach((element) => {
    if (Object.keys(element)[0] === req.params.shortURL) {
      res.redirect(Object.values(element)[0]);
    } else {
      res.redirect('/badowner');
    }
  });
};
exports.render_register = (req, res) => {
  if (session) {
    res.redirect('/urls');
  }
  res.render('register', {cookie: req.session.userID});
};
/* TODO better 400 handling */
exports.post_register = (req, res) => {
  const rng = genRang();
  const email = req.body.email;
  const pass = req.body.password;
  if (isEmpty(email, pass) === 'red') {
    res.send(`400 is empty`);
  } else if (checkExist(users, email)) {
    res.send('400 exists');
  } else {
    req.session.userID = rng;
    users[rng] = {id: rng, email: email, password: bcrypt.hashSync(pass, 10)};
    console.log(users);
    res.redirect('/urls');
  }
};

exports.render_login = (req, res) => {
  if (session) {
    res.redirect('/urls');
  }
  res.render('login', {cookie: req.session.userID});
};
/* TODO better 400 handling */
exports.post_login = (req, res) => {
  if (checkLogin(users, req.body) === undefined) {
    res.send('400');
  } else {
    req.session.userID = checkLogin(users, req.body);
    res.redirect('/urls');
  }
};

exports.post_logout = (req, res) => {
  req.session = null;
  res.redirect('/urls');
};


