const db = require('../server/urlDB');

// Hello
exports.render_homepage = (req, res) => {
  res.render('index');
};

exports.render_JSON = (req, res) => {
  res.send(db);
};

exports.render_id = (req, res) => {
  shortURL = req.params.shortURL;
  res.redirect(db[shortURL]);
};

exports.render_login = (req, res) => {
  console.log(req.body)
  res.render('login')
}

exports.post_login = (req, res) => {
  console.log(req.body)
  res.cookie('userID', req.body.userName)
  res.redirect('/urls')
}

exports.post_logout = (req, res) => {
  res.clearCookie('userID');
  res.redirect('/urls')
}