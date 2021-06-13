const express = require("express")
const { container } = require("../config/depedency-injection.config")
const participantController = container.resolve("participantController")
const router = express.Router()

// validator
const validateBody = require("../middleware/bodyValidator")
const schema = require("../services/participant/participant.schema")

const { uploadFotoParticipant, isUploadPhoto } = require("../middleware/upload")

router.route("/twibbon").get(participantController.viewAllTwibbon)

router
  .route("/twibbon/:eventId")
  .post(
    uploadFotoParticipant.single("foto_participant"),
    isUploadPhoto(),
    participantController.createTwibbon
  )
  .get(participantController.viewTwibbon)

router
  .route("/twibbon/:eventId/:twibbonId")
  .delete(participantController.deleteTwibbon)

router
  .route("/update/profile")
  .patch(
    validateBody(schema.updateProfileSchema),
    participantController.updateProfile
  )
module.exports = router
