const db = require('../server/urlDB');
const helpers = require('../helpers/functions');
const findKeyVal = helpers.returnKeyVal
const genRang = helpers.rng
// Hello
exports.render_urls = (req, res) => {
  res.render('urls');
};

exports.render_id = (req, res) => {
  res.send(findKeyVal(db, req.params.id));
};

exports.render_new = (req, res) => {
  res.render('new');
}

exports.post_new = (req, res) => {
  rString = genRang()
  longURL = req.body.longURL
  db[rString] = longURL
  res.redirect(`/urls/${rString}`)
}
