const db = require('../server/urlDB');
const helpers = require('../helpers/functions');
const genRang = helpers.rng;
const objCheck = helpers.objIsEmpty;
const outDB = helpers.outDB



// Hello
//Add no urls prompt
exports.render_urls = (req, res) => {
  if (this.testVar) {
    res.render('urls', {db: db[cookie], cookie: cookie})
  } else if (session) {
  res.render('urls', {db: db[session], cookie: session});
  } else {
    res.redirect('/loginErr')
  }
};
/* TODO add loop to elseif */
exports.render_id = (req, res) => {
  if (this.testVar) {
    res.render('show', {val: req.params.id, longVal: db['cookie']['cookie1'], cookie: cookie});
  } else if (req.params.id === Object.keys(db[session])[0]) {
    res.render('show', {val: req.params.id, longVal: db[session][req.params.id], cookie: session});
  } else {
    res.redirect('/loginErr')
  }
}

exports.render_new = (req, res) => {
  if (this.testVar) {
    res.render('new', {cookie: cookie});
  } else if (objCheck(session) === 'goodCookie') {
    res.render('new', {cookie: session});
  } else {
    res.redirect('/login');
  }
};

exports.post_new = (req, res) => {
  rString = genRang();
  longURL = req.body.longURL;
  db[session] = {...db[session], [rString]: longURL};
  console.log(db)
  res.redirect(`/urls/${rString}`);
};

exports.post_delete = (req, res) => {
  delete db[session][req.params.id];
  res.redirect('/urls');
};

exports.post_update = (req, res) => {
  shortUrl = req.params.id;
  longUrl = req.body.longURL;
  console.log(shortUrl)
  console.log(longUrl)
  db[session][shortUrl] = longUrl;
  res.redirect('/urls');
};
