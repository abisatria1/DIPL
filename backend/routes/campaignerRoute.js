const express = require("express")
const { container } = require("../config/depedency-injection.config")
const campaignerController = container.resolve("campaignerController")
const router = express.Router()

// validator
const validateBody = require("../middleware/bodyValidator")
const schema = require("../services/event/event.schema")

router.route("/find/event").get(campaignerController.findEvent)

router
  .route("/event")
  .post(
    validateBody(schema.createEventSchema),
    campaignerController.createEvent
  )
  .get(campaignerController.viewAllEvent)

router
  .route("/event/:eventId")
  .get(campaignerController.viewEvent)
  .patch(
    validateBody(schema.updateEventSchema),
    campaignerController.updateEvent
  )
  .delete(campaignerController.deleteEvent)

module.exports = router
