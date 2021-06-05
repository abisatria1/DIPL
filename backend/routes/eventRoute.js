const express = require("express")
const { container } = require("../config/depedency-injection.config")
const eventController = container.resolve("eventController")
const router = express.Router()

// validator
// const validateBody = require("../middleware/bodyValidator")
// const schema = require("../services/user/user.schema")

router.route("/").get(eventController.viewAllEvent)

module.exports = router
