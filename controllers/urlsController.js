const db = require('../server/urlDB');
const helpers = require('../helpers/functions');
const genRang = helpers.rng;
// Hello
exports.render_urls = (req, res) => {
  res.render('urls', {db: db, cookie: req.cookies['userID']});
};

exports.render_id = (req, res) => {
  val = req.params.id;
  res.render('show', {short: val, long: db[val], cookie: req.cookies['userID']});
};

exports.render_new = (req, res) => {
  res.render('new', {cookie: req.cookies['userID']});
};

exports.post_new = (req, res) => {
  rString = genRang();
  longURL = req.body.longURL;
  db[rString] = longURL;
  res.redirect(`/urls/${rString}`);
};

exports.post_delete = (req, res) => {
  delete db[req.params.id];
  res.redirect('/urls');
};

exports.post_update = (req, res) => {
  shortUrl = req.params.id;
  longUrl = req.body.longURL;
  db[shortUrl] = longUrl;
  res.redirect('/urls');
};
