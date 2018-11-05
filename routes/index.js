const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Sets cookie and session globally
// Cookie is used strictly for testing
router.use(function(req, res, next) {
  global.cookie = 'cookie'; // cookie = 'cookie'
  global.session = req.session.userID;
  next();
});
// Get home page
router.get('/', indexController.render_homepage);
// Get JSON of URL DB
router.get('/json', indexController.render_JSON);
// Get ID page
router.get('/u/:shortURL', indexController.render_id);
// Get login page
router.get('/login', indexController.render_login);
// Post to login
router.post('/login', indexController.post_login);
// Get register
router.get('/register', indexController.render_register);
// Post to register
router.post('/register', indexController.post_register);
// Post to logout
router.post('/logout', indexController.post_logout);
// Get error handler loginerr
router.get('/loginErr', indexController.render_loginErr);
// Get error handler badowner
router.get('/badowner', indexController.render_badOwnership);
// Get error handler bad request
router.get('/badReq', indexController.render_badreq);


module.exports = router;
