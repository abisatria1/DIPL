const Sequelize = require("sequelize")
const { container } = require("../../config/depedency-injection.config")
const db = container.resolve("db")

const EventParticipantModel = db.define("event-participant", {
  twibbonId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  foto_participant: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
  tanggal_upload: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  hasil_foto: {
    type: Sequelize.STRING(),
  },
})

module.exports = EventParticipantModel
