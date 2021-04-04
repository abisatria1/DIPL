const awilix = require("awilix")
const userController = require("../controllers/userController")
const Campaigner = require("../services/campaigner")
const Participant = require("../services/participant")
const User = require("../services/user/user")
const database = require("./database.config")

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
})

const setup = () => {
  container.register({
    userService: awilix.asClass(User),
    participantService: awilix.asClass(Participant),
    campaignerService: awilix.asClass(Campaigner),
    userController: awilix.asClass(userController),

    db: awilix.asValue(database),
  })
}

module.exports = {
  container,
  setup,
}
