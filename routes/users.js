const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController')

// Login user and sign JWT
router.post('/login', user_controller.user_login_post)

module.exports = router;
