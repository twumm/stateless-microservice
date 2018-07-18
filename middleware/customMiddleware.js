// Credit - https://stackoverflow.com/questions/6997262/how-to-pull-url-file-extension-out-of-url-string-using-javascript
exports.fileExtension = (url) => {
  return url.split('.').pop().split(/\#|\?/)[0]
}
