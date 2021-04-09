const express = require("express")
const { container } = require("../config/depedency-injection.config")
const userController = container.resolve("userController")
const router = express.Router()

// validator
const validateBody = require("../middleware/bodyValidator")
const schema = require("../services/user/user.schema")

router
  .route("/login")
  .post(validateBody(schema.loginSchema), userController.login)
router
  .route("/register/participant")
  .post(
    validateBody(schema.registerParticipantSchema),
    userController.registerParticipant
  )
router
  .route("/register/campaigner")
  .post(
    validateBody(schema.registerCampaignerSchema),
    userController.registerCampaigner
  )

module.exports = router
