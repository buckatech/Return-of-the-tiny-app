const db = require('../server/urlDB');
const helpers = require('../helpers/functions');
const genRang = helpers.rng;
const objCheck = helpers.objIsEmpty;
// Hello
exports.render_urls = (req, res) => {
  res.render('urls', {db: db, cookie: req.cookies['userID']});
};

exports.render_id = (req, res) => {
  val = req.params.id;
  res.render('show', {short: val, long: db[val], cookie: req.cookies['userID']});
};

exports.render_new = (req, res) => {
  if (objCheck(req.cookies.userID) === 'goodCookie') {
    res.render('new', {cookie: req.cookies['userID']});
  } else {
    res.redirect('/login');
  }
};

exports.post_new = (req, res) => {
  rString = genRang();
  longURL = req.body.longURL;
  db[req.cookies.userID] = {longURL: longURL, shortURL: rString};
  console.log(db);
  res.redirect(`/urls/${rString}`);
};

exports.post_delete = (req, res) => {
  console.log(req.params.id)
  delete db[req.params.id];
  res.redirect('/urls');
};

exports.post_update = (req, res) => {
  shortUrl = req.params.id;
  longUrl = req.body.longURL;
  console.log(req.body)
  db[shortUrl] = longUrl;
  res.redirect('/urls');
};
