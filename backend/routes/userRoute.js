const express = require("express")
const { container } = require("../config/depedency-injection.config")
const userController = container.resolve("userController")
const router = express.Router()

router.route("/login").post(userController.login)
router.route("/register/participant").post(userController.registerParticipant)
router.route("/register/campaigner").post(userController.registerCampaigner)

module.exports = router
