const {fileExtension} = require('../middleware/customMiddleware')
const imageTypes = ['jpg', 'tif', 'gif', 'png', 'svg']
const sharp = require('sharp')
const download = require('image-downloader')

// Resize image on post
exports.create_thumbnail_post = (req, res, next) => {
  // Save image url and extension
  const imageUrl = req.body.image_url
  const imageUrlExt = fileExtension(req.body.image_url)
  
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
            res.send(`File resized and saved to ${resizeFolder}`)
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
  else {
    res.send({error: 'We only handle image files.'})
  }
}
