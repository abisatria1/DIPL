const Sequelize = require("sequelize")
const { container } = require("../../config/depedency-injection.config")
const db = container.resolve("db")

const EventParticipantModel = db.define("event-participant", {
  foto_participant: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  tanggal_upload: {
    type: Sequelize.DATE,
  },
  hasil_foto: {
    type: Sequelize.STRING(32),
  },
})

module.exports = EventParticipantModel
