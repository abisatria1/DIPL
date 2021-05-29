const multer = require("multer")
const { fileFilterBySchema } = require("../helper/uploadFileFilter")
const eventSchema = require("../services/event/event.schema")

/**
 * Check if photo was updated
 * @returns nextFunction
 */
const isUploadPhoto = () => {
  return async (req, res, next) => {
    const photo = req.file || req.files

    if (!photo) return res.sendError(undefined, "Please insert photo", 422)
    if (Array.isArray(photo) && !photo.length)
      return res.sendError(undefined, "Please insert photo", 422)

    next()
  }
}

/**
 * Membuat storage dari multer
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = `image/`

    switch (file.fieldname) {
      case "template_twibbon":
        folder += "template"
        break
      case "foto_participant":
        folder += "foto_participant"
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

/**
 * Instansiasi multer untuk upload twibbon
 */
const uploadTwibbon = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilterBySchema(eventSchema.createEventSchema),
})

/**
 * Instansiasi multer untuk update template twibbon
 */
const updateTemplateTwibbon = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilterBySchema(),
})

/**
 * Instansiasi multer untuk upload foto diri
 */
const uploadFotoParticipant = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilterBySchema(),
})

module.exports = {
  uploadTwibbon,
  updateTemplateTwibbon,
  uploadFotoParticipant,
  isUploadPhoto,
}
