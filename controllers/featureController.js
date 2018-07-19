const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const {fileExtension} = require('../middleware/customMiddleware')
const imageTypes = ['jpg', 'tif', 'gif', 'png', 'svg']
const sharp = require('sharp')
const download = require('image-downloader')
const jsonpatch = require('fast-json-patch')

// Resize image on post
exports.create_thumbnail_post = (req, res, next) => {
  // Save image url and extension
  const imageUrl = req.body.imageUrl
  const imageUrlExt = fileExtension(imageUrl)
  
  // If image url extension is a type of image file, proceed to resize
  if (imageTypes.includes(imageUrlExt)) {
    
    // Download image and save
    const options = {
      url: imageUrl,
      dest: './public/images/original/'
    }
    // Set location for resized images to be saved.
    const resizeFolder = './public/images/resized/'

    // Download image from the url and save in selected destination in options.
    download.image(options)
      .then(({filename, image}) => {
        // Resize image to 50x50 and save to desired location.
        // Return conversion status to user.
        sharp(filename)
          .resize(50, 50)
          .toFile(`${resizeFolder}output.${imageUrlExt}`, err => {
            if (err) {return next(err)}
            res.json({converted: true, success: 'Image has been resized', thumbnail: resizeFolder})
        })
      })
      .catch(err => {
        res.status(400).json({error: 'Oops something went wrong. Kindly try again'})
      })
  }
  else {
    res.json({error: 'We only handle image files.'})
  }
}

// Apply json patch to json object and return patched object.
exports.patch_json_patch = [
  // Validate input fields. Trim spaces around username
  body('jsonObject', 'JSON object must not be empty.').isLength({min: 1}),
  body('jsonPatchObject', 'JSON patch object must not be empty.').isLength({min: 1}),

  // Process the request after validating.
  (req, res, next) => {
    // Save errors from validating, if any.
    const errors = validationResult(req);

    // Check if there were errors from the form.
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    else {
      // Save object-to-patch and patch-object from the request.
      let jsonObject = JSON.parse(req.body.jsonObject)
      let jsonPatchObject = JSON.parse(req.body.jsonPatchObject)
     
      // Save patch in new variable.
      let patchedObject = jsonpatch.applyPatch(jsonObject, jsonPatchObject).newDocument
      res.json({patchedObject: patchedObject})
    }
  }
]
