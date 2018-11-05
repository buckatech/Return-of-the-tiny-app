const express = require('express');
const router = express.Router();
const urlsController = require('../controllers/urlsController');

// Sets cookie and session globally
// Cookie is used strictly for testing
router.use(function(req, res, next) {
  global.cookie = 'cookie'; // cookie = 'cookie'
  global.session = req.session.userID;
  next();
});
// Get URLS page
router.get('/', urlsController.render_urls);
// Get new URL page
router.get('/new', urlsController.render_new);
// Get URLS id page
router.get('/:id', urlsController.render_id);
// Post to URLS
router.post('/', urlsController.post_new);
// Post to update ID
router.post('/:id/update', urlsController.post_update);
// Post to delete ID
router.post('/:id/delete', urlsController.post_delete);

module.exports = router;
