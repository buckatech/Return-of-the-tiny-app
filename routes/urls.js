const express = require('express');
const router = express.Router();
const urlsController = require('../controllers/urlsController');

/* GET URLS page. */

router.use(function(req, res, next) {
  global.cookie = 'cookie'; // cookie = 'cookie'
  global.session = req.session.userID;
  next();
});

router.get('/', urlsController.render_urls);

router.get('/new', urlsController.render_new);

router.get('/:id', urlsController.render_id);

router.post('/', urlsController.post_new);

router.post('/:id/update', urlsController.post_update);

router.post('/:id/delete', urlsController.post_delete);

module.exports = router;
