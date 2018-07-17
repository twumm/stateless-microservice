const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

exports.user_login_post = [
  // Validate input fields. Trim spaces around username
  body('username', 'Username required.').isLength({min: 3}).trim(),
  body('password', 'Password must atleast 6 characters.').isLength({ min:6 }),

  // Sanitize body with the wildcard.
  sanitizeBody('*'),
]


// (req, res, next) => {
//   res.send('User logged in')
// }
