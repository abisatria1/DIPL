const multer = require("multer");
const { fileFilterBySchema } = require("../helper/uploadFileFilter");
const eventSchema = require("../services/event/event.schema");
const SIZE_UPLOAD_LIMIT = 1024 * 1024 * 5; // 5 MB
/**
 * Check if photo was updated
 * @returns nextFunction
 */
const isUploadPhoto = () => {
  return async (req, res, next) => {
    const photo = req.file || req.files;

    if (!photo || (Array.isArray(photo) && !photo.length))
      return res.sendError(undefined, new Error("Please insert photo"), 422);

    next();
  };
};

/**
 * Membuat storage dari multer
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = `image/`;

    switch (file.fieldname) {
      case "template_twibbon":
        folder += "template";
        break;
      case "foto_participant":
        folder += "foto_participant";
        break;
      case "hasil_foto":
        folder += "foto";
      default:
        break;
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  },
});

/**
 * Instansiasi multer untuk upload twibbon
 */
const uploadTwibbon = multer({
  storage,
  limits: {
    fileSize: SIZE_UPLOAD_LIMIT,
  },
  fileFilter: fileFilterBySchema(eventSchema.createEventSchema, ["image/png"]),
});

/**
 * Instansiasi multer untuk update template twibbon
 */
const updateTemplateTwibbon = multer({
  storage,
  limits: {
    fileSize: SIZE_UPLOAD_LIMIT,
  },
  fileFilter: fileFilterBySchema(undefined, ["image/png"]),
});

/**
 * Instansiasi multer untuk upload foto diri
 */
const uploadFotoParticipant = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: SIZE_UPLOAD_LIMIT,
  },
  fileFilter: fileFilterBySchema(),
});

module.exports = {
  uploadTwibbon,
  updateTemplateTwibbon,
  uploadFotoParticipant,
  isUploadPhoto,
};
