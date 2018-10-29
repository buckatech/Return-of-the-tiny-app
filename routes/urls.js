const express = require('express');
const router = express.Router();
const urlsController = require('../controllers/urlsController');

/* GET URLS page. */
router.get('/', urlsController.render_urls);

// router.get('/new', urlsController.render_new);

// router.get('/:id', urlsController.render_id);

module.exports = router;
