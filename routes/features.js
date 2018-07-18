const express = require('express');
const router = express.Router();
const feature_controller = require('../controllers/featureController')


// Test get
router.post('/create-thumbnail', feature_controller.create_thumbnail_post)

module.exports = router;
