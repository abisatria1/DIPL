const Sequelize = require("sequelize")
const { container } = require("../../config/depedency-injection.config")
const db = container.resolve("db")

const EventModel = db.define("event", {
  nama_event: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  tanggal_event: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  jumlah_anggota: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  template_twibbon: {
    type: Sequelize.STRING(32),
  },
  deskripsi_event: {
    type: Sequelize.TEXT,
  },
})

module.exports = EventModel
