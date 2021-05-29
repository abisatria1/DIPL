const awilix = require("awilix")
const {
  campaignerController,
  userController,
  participantController,
} = require("../controllers")
const Campaigner = require("../services/campaigner")
const Event = require("../services/event/event")
const Participant = require("../services/participant")
const User = require("../services/user/user")
const database = require("./database.config")

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
})

// setup untuk depedency injection
const setup = () => {
  container.register({
    userService: awilix.asClass(User),
    participantService: awilix.asClass(Participant),
    campaignerService: awilix.asClass(Campaigner),
    eventService: awilix.asClass(Event),

    userController: awilix.asClass(userController),
    campaignerController: awilix.asClass(campaignerController),
    participantController: awilix.asClass(participantController),
    db: awilix.asValue(database),
  })
}

module.exports = {
  container,
  setup,
}
