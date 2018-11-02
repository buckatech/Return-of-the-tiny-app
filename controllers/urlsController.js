const db = require('../server/urlDB');
const helpers = require('../helpers/functions');
const genRang = helpers.rng;
const objCheck = helpers.objIsEmpty;
const outDB = helpers.outDB



// Hello
//Add no urls prompt
exports.render_urls = (req, res) => {
  if (db[req.session.userID]) {
  res.render('urls', {db: db[req.session.userID], cookie: req.session.userID});
  } else {
    res.redirect('/login')
  }
};

exports.render_id = (req, res) => {
  val = req.params.id;
  res.render('show', {short: val, long: db[val], cookie: req.session.userID});
};

exports.render_new = (req, res) => {
  if (objCheck(req.session.userID) === 'goodCookie') {
    res.render('new', {cookie: req.session.userID});
  } else {
    res.redirect('/login');
  }
};

exports.post_new = (req, res) => {
  rString = genRang();
  longURL = req.body.longURL;
  db[req.session.userID] = {...db[req.session.userID], [rString]: longURL};
  console.log(db)
  res.redirect(`/urls/${rString}`);
};

exports.post_delete = (req, res) => {
  delete db[req.session.userID][req.params.id];
  res.redirect('/urls');
};

exports.post_update = (req, res) => {
  shortUrl = req.params.id;
  longUrl = req.body.longURL;
  console.log(shortUrl)
  console.log(longUrl)
  db[req.session.userID][shortUrl] = longUrl;
  res.redirect('/urls');
};
