const express = require("express")
const { container } = require("../config/depedency-injection.config")
const campaignerController = container.resolve("campaignerController")
const router = express.Router()

router.route("/find/event").get(campaignerController.findEvent)

router
  .route("/event")
  .post(campaignerController.createEvent)
  .get(campaignerController.viewAllEvent)

router
  .route("/event/:eventId")
  .get(campaignerController.viewEvent)
  .patch(campaignerController.updateEvent)
  .delete(campaignerController.deleteEvent)

module.exports = router
