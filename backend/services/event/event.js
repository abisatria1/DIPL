const Service = require("../Service")
const Op = require("sequelize").Op

class Event extends Service {
  constructor({ db }) {
    super({ db })
  }

  async viewByCampaigner(campaignerId) {
    return await this.db.Event.findAll({ where: { campaignerId } })
  }

  async viewDetailEvent(eventId) {
    return await this.db.Event.findByPk(eventId)
  }

  async findByName(eventName, campaignerId) {
    return await this.db.Event.findAll({
      where: {
        [Op.and]: [
          { nama_event: { [Op.like]: `%${eventName}%` } },
          { campaignerId },
        ],
      },
    })
  }

  async createEvent(
    eventData = {
      nama_event,
      tanggal_event,
      jumlah_anggota,
      template_twibbon,
      deskripsi_event,
      campaignerId,
    }
  ) {
    const result = await this.db.Event.create(eventData)
    return result
  }

  async updateEvent(
    newData = {
      nama_event,
      tanggal_event,
      jumlah_anggota,
      template_twibbon,
      deskripsi_event,
    },
    eventId,
    campaignerId
  ) {
    const event = await this.db.Event.findOne({
      where: {
        [Op.and]: [{ id: eventId }, { campaignerId }],
      },
    })
    if (!event) {
      const error = new Error("Unauthorized")
      error.status = 401
      throw error
    }
    const result = await event.update(newData)
    return result
  }

  async deleteEvent(eventId, campaignerId) {
    const event = await this.db.Event.findOne({
      where: {
        [Op.and]: [{ id: eventId }, { campaignerId }],
      },
    })
    if (!event) {
      const error = new Error("Unauthorized")
      error.status = 401
      throw error
    }
    const result = await event.destroy()
    return result
  }
}

module.exports = Event
