const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */

router.use(function(req, res, next) {
  global.cookie = 'cookie'; // cookie = 'cookie'
  global.session = req.session.userID;
  next();
});
router.get('/', indexController.render_homepage);

router.get('/json', indexController.render_JSON);

router.get('/u/:shortURL', indexController.render_id);

router.get('/login', indexController.render_login);

router.post('/login', indexController.post_login);

router.get('/loginErr', indexController.render_loginErr)

router.get('/register', indexController.render_register);

router.post('/register', indexController.post_register);

router.post('/logout', indexController.post_logout);


module.exports = router;
