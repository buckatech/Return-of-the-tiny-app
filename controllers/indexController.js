const bcrypt = require('bcrypt');

const db = require('../server/urlDB');
const users = require('../server/userDB');
const helpers = require('../helpers/functions');


const genRang = helpers.rng;
const checkExist = helpers.checkExist;
const isEmpty = helpers.isEmpty;
const checkLogin = helpers.checkLogin;


/**
 * @param {req} HTTP Object
 * @param {res} HTTP Object
 * Redirects to urls if user is logged in.
 * Redirects to login if user is not logged in.
 */
exports.render_homepage = (req, res) => {
  if (this.testVar) {
    res.render('index', {cookie: cookie});
  } else if (session) {
    res.redirect('/urls');
  } else {
    res.redirect('/login');
  }
};

/**
 *
 * @param {req} HTTP Object
 * @param {res} HTTP Object
 * If req paramater matches url will redirect to site
 * If req paramater does not match weil redir to error page
 */
exports.render_id = (req, res) => {
  Object.values(db).forEach((element) => {
    if (Object.keys(element)[0] === req.params.shortURL) {
      res.redirect(Object.values(element)[0]);
    } else {
      res.redirect('/badowner');
    }
  });
};
/**
 *
 * @param {req} HTTP Object
 * @param {res} HTTP Object
 * If session exists redirect to urls
 * If not render register page
 */
exports.render_register = (req, res) => {
  if (session) {
    res.redirect('/urls');
  }
  res.render('register', {cookie: req.session.userID});
};
/**
 *
 * @param {req} HTTP Object
 * @param {res} HTTP Object
 * If pass or email is empty render an error page
 * If email exists render an error page
 * If email and pass are good add the user to the database and redir to urls
 */
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

/**
 *
 * @param {req} HTTP Object
 * @param {res} HTTP Object
 * If session exists redir to urls
 * If session does not exist render the login page
 */
exports.render_login = (req, res) => {
  if (session) {
    res.redirect('/urls');
  }
  res.render('login', {cookie: req.session.userID});
};

/**
 *
 * @param {req} HTTP Object
 * @param {res} HTTP Object
 * If does not exist render 400 error
 * If user exists redirect to urls and issue a session
 */
exports.post_login = (req, res) => {
  if (checkLogin(users, req.body) === undefined) {
    res.send('400');
  } else {
    req.session.userID = checkLogin(users, req.body);
    res.redirect('/urls');
  }
};

/**
 *
 * @param {req} req
 * @param {res} res
 * Destroy session and redirect to urls
 */
exports.post_logout = (req, res) => {
  req.session = null;
  res.redirect('/urls');
};

// Error handler for cookie url mismatch
exports.render_badOwnership = (req, res) => {
  res.render('badOwnership');
};
// Error handler for login errors
exports.render_loginErr = (req, res) => {
  res.render('loginErr');
};
// Error handler for bad requests
exports.render_badreq = (req, res) => {
  res.render('badReq');
};
// Debber render JSON
exports.render_JSON = (req, res) => {
  res.send(db);
};
