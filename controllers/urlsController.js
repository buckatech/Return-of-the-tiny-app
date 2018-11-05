const db = require('../server/urlDB');
const helpers = require('../helpers/functions');
const genRang = helpers.rng;
const objCheck = helpers.objIsEmpty;
const outDB = helpers.outDB
const innerUrls = helpers.innerUrls;



/**
 * 
 * @param {req} req 
 * @param {res} res 
 * If session exists render urls
 * If session does not exist redirect to loginErr
 */
exports.render_urls = (req, res) => {
  if (this.testVar) {
    res.render('urls', {db: db[cookie], cookie: cookie})
  } else if (session) {
  res.render('urls', {db: db[session], cookie: session});
  } else {
    res.redirect('/loginErr')
  }
};
/**
 * 
 * @param {req} req 
 * @param {res} res 
 * If session does not exist redirect to loginErr
 * If Url does not exist send Err
 * If Url does not belong to session redirect to Err page
 * If All params are good render the Update page
 */
exports.render_id = (req, res) => {
  dbInner = innerUrls(db)
  console.log(session)
  if (this.testVar) {
    res.render('show', {val: req.params.id, longVal: db['cookie']['cookie1'], cookie: cookie});
  } else if (!session) {
    res.redirect('/loginErr')
  } else if (!dbInner[req.params.id]) {
    res.send('No Url for this shortURL')
  } else if (db[session] && !db[session][req.params.id]) {
    res.redirect('/badowner')
  } else {
    res.render('show', {val: req.params.id, longVal: db[session][req.params.id], cookie: session});
  }
}
/**
 * 
 * @param {req} req 
 * @param {res} res
 * If session exists render new URL page
 * If session does not exist redirect to login 
 */
exports.render_new = (req, res) => {
  if (this.testVar) {
    res.render('new', {cookie: cookie});
  } else if (objCheck(session) === 'goodCookie') {
    res.render('new', {cookie: session});
  } else {
    res.redirect('/login');
  }
};
/**
 * 
 * @param {req} req 
 * @param {res} res
 * If session exists add new URL to urlDB and redirect to update page for that URL
 * If session does not exist redir to loginErr 
 */
exports.post_new = (req, res) => {
  if (session) {
  rString = genRang();
  longURL = req.body.longURL;
  db[session] = {...db[session], [rString]: longURL};
  res.redirect(`/urls/${rString}`);
  } else {
    res.redirect('/loginErr')
  }
};
/**
 * 
 * @param {req} req 
 * @param {res} res
 * If Url exists and belongs to session delete
 * If Url does not belong to the owner render Err page
 * If user is not logged in render Err page 
 */
exports.post_delete = (req, res) => {
  if (db[session] && req.params.id === Object.keys(db[session])[0]) {
  delete db[session][req.params.id];
  res.redirect('/urls');
  } else if (session) {
    res.redirect('/badowner')
  } else {
    res.redirect('/loginErr')
  }
};

/**
 * 
 * @param {req} req 
 * @param {res} res
 * If Url exists and is owned by session update it
 * If Url does not belong to session render Err page
 * If no session redirect to Err 
 */
exports.post_update = (req, res) => {
  if (db[session] && req.params.id === Object.keys(db[session])[0]) {
  shortUrl = req.params.id;
  longUrl = req.body.longURL;
  db[session][shortUrl] = longUrl;
  res.redirect('/urls');
  } else if (session) {
    res.redirect('/badowner')
  } else {
    res.redirect('/loginErr')
  }
};
