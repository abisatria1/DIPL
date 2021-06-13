const express = require("express")
const { container } = require("../config/depedency-injection.config")
const eventController = container.resolve("eventController")
const router = express.Router()

// validator
// const validateBody = require("../middleware/bodyValidator")
// const schema = require("../services/user/user.schema")

router.route("/").get(eventController.viewAllEvent)
router.route("/search").get(eventController.searchEvent)
router.route("/:eventId").get(eventController.viewDetailEvent)
module.exports = router
