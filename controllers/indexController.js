const db = require('../server/urlDB');
// Hello
exports.render_homepage = (req, res) => {
  res.render('index');
};

exports.render_JSON = (req, res) => {
  res.send(db);
};
