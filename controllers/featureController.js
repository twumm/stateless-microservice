const {fileExtension} = require('../middleware/customMiddleware')
const imageTypes = ['jpg', 'tif', 'gif', 'png', 'svg']

// Resize image on post
exports.create_thumbnail_post = (req, res, next) => {
  // Save image url and extension
  const imageUrl = req.body.image_url
  const imageUrlExt = fileExtension(req.body.image_url)
  
  // If image url extension is a type of image file, proceed to resize
  if (imageTypes.includes(imageUrlExt)) {
    res.send(`Image is ${imageUrlExt}`)
  }
  else {
    res.send({error: 'We only handle image files.'})
  }
}
