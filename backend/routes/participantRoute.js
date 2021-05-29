const express = require("express")
const { container } = require("../config/depedency-injection.config")
const participantController = container.resolve("participantController")
const router = express.Router()

// validator
// const validateBody = require("../middleware/bodyValidator")
// const schema = require("../services/user/user.schema")

const { uploadFotoParticipant, isUploadPhoto } = require("../middleware/upload")

router
  .route("/twibbon/:eventId")
  .patch(participantController.createTwibbon)
  .post(
    uploadFotoParticipant.single("foto_participant"),
    isUploadPhoto(),
    participantController.uploadFotoDiri
  )
  .get(participantController.viewTwibbon)

router
  .route("/twibbon/:eventId/:twibbonId")
  .delete(participantController.deleteTwibbon)

module.exports = router
