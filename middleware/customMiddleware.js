const jwt = require('jsonwebtoken')
require('dotenv').load()

// Get the extension of a url/file
// Credit - https://stackoverflow.com/questions/6997262/how-to-pull-url-file-extension-out-of-url-string-using-javascript
exports.fileExtension = (url) => {
  return url.split('.').pop().split(/\#|\?/)[0]
}

// Verify token
exports.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.body.token

  // Return forbidden status if the token is not available
  if (!token) { 
    return res.status(403).send({authorized: false, error: 'Token does not exist.'})
  }

  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) { return res.status(500).send({authorized: false, error: 'Verification failed.'})}
    // No error so go to next process.
    next();
  })  
}
