const Sequelize = require("sequelize")
const { container } = require("../../config/depedency-injection.config")
const db = container.resolve("db")

const ParticipantModel = db.define("participant", {
  nama_participant: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
})

module.exports = ParticipantModel
