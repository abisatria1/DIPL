const multer = require("multer")
const { fileFilterForCreateTwibbon } = require("../helper/uploadFileFilter")

const isUploadPhoto = () => {
  return async (req, res, next) => {
    const photo = req.file || req.files

    if (!photo) return res.sendError(undefined, "Please insert photo", 422)
    if (Array.isArray(photo) && !photo.length)
      return res.sendError(undefined, "Please insert photo", 422)

    next()
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = `image/`

    switch (file.fieldname) {
      case "template_twibbon":
        folder += "template"
        break
      case "hasil_foto":
        folder += "foto"
      default:
        break
    }
    cb(null, folder)
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`
    cb(null, filename)
  },
})

const uploadTwibbon = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilterForCreateTwibbon(),
})

module.exports = {
  uploadTwibbon,
  isUploadPhoto,
}
