const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.render_homepage);

router.get('/json', indexController.render_JSON);

router.get('/u/:shortURL', indexController.render_id);

router.get('/login', indexController.render_login);

router.post('/login', indexController.post_login)

// router.get('/register', indexController.render_register);

router.post('/logout', indexController.post_logout)


module.exports = router;
