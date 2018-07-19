const express = require('express');
const router = express.Router();
const feature_controller = require('../controllers/featureController')
const { verifyToken } = require('../middleware/customMiddleware')

// Route to create image thumbnail.
router.post('/create-thumbnail', verifyToken, feature_controller.create_thumbnail_post)

// Route to patch json objects.
router.patch('/patch-object', verifyToken, feature_controller.patch_json_patch)

module.exports = router;
