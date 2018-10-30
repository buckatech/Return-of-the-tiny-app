const db = require('../server/urlDB');
const helpers = require('../helpers/functions');
const genRang = helpers.rng;
// Hello
exports.render_urls = (req, res) => {
  console.log(db)
  res.render('urls', {db: db});
};

exports.render_id = (req, res) => {
  val = req.params.id;
  res.render('show', {short: val, long: db[val]});
};

exports.render_new = (req, res) => {
  res.render('new');
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
  shortUrl = req.params.id
  console.log(shortUrl)
  longUrl = req.body.longURL
  console.log(longUrl)
  db[shortUrl] = longUrl
  console.log(db)
  res.redirect('/urls');
};
