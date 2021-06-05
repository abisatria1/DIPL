const Service = require("../Service")
const Op = require("sequelize").Op
const { deleteFile } = require("../../helper/file")

/**
 * Class ini berisi bisnis logic dari event
 */
class Event extends Service {
  /**
   * depedency injection database.
   * untuk menambahkan depedency bisa menambahkan pada parameter
   * @param {Sequelize} db
   */
  constructor({ db }) {
    super({ db })
  }

  /**
   * Mengambil seluruh data event pada database
   * @returns seluruh data event
   */
  async viewAllEvent() {
    const event = await await this.db.Event.findAll({})
    return event
  }

  /**
   * Mengambil seluruh data event pada database yang dimiliki oleh suatu campaigner
   * @param {Number} campaignerId
   * @returns seluruh data event yang dimiliki oleh campaigner dengan id = campaingerId
   */
  async viewByCampaigner(campaignerId) {
    return await this.db.Event.findAll({ where: { campaignerId } })
  }

  /**
   * Mengambil suatu data event yang dimiliki oleh campaigner
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns salah satu data event
   */
  async viewDetailEvent(eventId, campaignerId) {
    const event = await this.db.Event.findOne({
      where: { [Op.and]: [{ id: eventId }, { campaignerId }] },
    })
    if (!event) {
      const err = new Error("Event not Found")
      err.status = 400
      throw err
    }
    return event
  }

  /**
   * Mengambil suatu data event dengan id event
   * @param {Number} eventId
   * @returns salah satu data event
   */
  async viewDetailEventByParticipant(eventId) {
    const event = await this.db.Event.findOne({
      where: { id: eventId },
    })
    if (!event) {
      const err = new Error("Event not Found")
      err.status = 400
      throw err
    }
    return event
  }

  /**
   * Mencari data event berdasarkan nama event yang dimiliki oleh suatu campaigner
   * @param {String} eventName
   * @param {Number} campaignerId
   * @returns beberapa event yang sesuai dengan query
   */
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

  /**
   * Membuat sebuah event oleh suatu campaigner
   * @param {Object} eventData
   * @param {String} eventData.nama_event
   * @param {String} eventData.tanggal_event
   * @param {Number} eventData.jumlah_anggota
   * @param {String} eventData.template_twibbon
   * @param {String} eventData.deskripsi_event
   * @param {Number} eventData.campaignerId
   * @returns event yang berhasil dibuat
   */
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

  /**
   * update data dari suatu event
   * @param {Object} newData
   * @param {String} newData.nama_event
   * @param {String} newData.tanggal_event
   * @param {Number} newData.jumlah_anggota
   * @param {String} newData.deskripsi_event
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns banyak row yang berubah
   */
  async updateEvent(
    newData = {
      nama_event,
      tanggal_event,
      jumlah_anggota,
      deskripsi_event,
    },
    eventId,
    campaignerId
  ) {
    // mencari apakah event ada atau tidak di database
    const event = await this.db.Event.findOne({
      where: {
        [Op.and]: [{ id: eventId }, { campaignerId }],
      },
    })
    if (!event) {
      const error = new Error("Event not found")
      error.status = 400
      throw error
    }
    // update event data
    const result = await event.update(newData)
    return result
  }

  /**
   * Mengupdate data template twibbon suatu event
   * @param {String} template_twibbon
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns banyak row yang berubah
   */
  async updateEventTemplateTwibbon(
    { template_twibbon },
    eventId,
    campaignerId
  ) {
    // mencari apakah event ada atau tidak di database
    const event = await this.db.Event.findOne({
      where: {
        [Op.and]: [{ id: eventId }, { campaignerId }],
      },
    })
    if (!event) {
      deleteFile(template_twibbon)
      const error = new Error("Event not found")
      error.status = 400
      throw error
    }
    // menghapus template twibbon yang lama
    deleteFile(event.template_twibbon)
    // update data event
    const result = await event.update({ template_twibbon })
    return result
  }

  /**
   * menghapus suatu event yang dimiliki oleh suatu campaigner
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns null
   */
  async deleteEvent(eventId, campaignerId) {
    // mencari apakah event ada atau tidak di database
    const event = await this.db.Event.findOne({
      where: {
        [Op.and]: [{ id: eventId }, { campaignerId }],
      },
    })
    if (!event) {
      const error = new Error("Event not found")
      error.status = 400
      throw error
    }
    // menghapus template twibbon
    deleteFile(event.template_twibbon)
    // delete event
    const result = await event.destroy()
    return result
  }
}

module.exports = Event
