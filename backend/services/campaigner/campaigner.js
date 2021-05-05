const Service = require("../Service")
class Campaigner extends Service {
  /**
   * depedency injection service event.
   * untuk menambahkan depedency bisa menambahkan pada parameter
   * @param {Sequelize} db
   * @param {EventService} eventService
   */
  constructor({ db, eventService }) {
    super({ db })
    this.eventService = eventService
  }

  /**
   * Membuat event baru dengan template twibbon.
   * @param {nama_event, tanggal_event, jumlah_anggota, deskripsi_event, template_twibbon, campaignerId} eventBody
   * @returns data event yang sudah dibuat
   */
  async createEvent(eventBody) {
    return await this.eventService.createEvent(eventBody)
  }

  /**
   * update data event suatu event dengan id event
   * @param eventBody data event
   * @param {String} eventBody.nama_event nama event
   * @param {String} eventBody.tanggal_event tanggal event
   * @param {Number} eventBody.jumlah_anggota jumlah anggota mengikuti event
   * @param {String} eventBody.deskripsi_event deskripsi event
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns jumlah row yang berhasil di update
   */
  async updateEvent(eventBody, eventId, campaignerId) {
    return await this.eventService.updateEvent(eventBody, eventId, campaignerId)
  }

  /**
   * update template twibbon suatu event dari id event
   * @param template object template twibbon
   * @param {String} template.template_twibbon template twibbon
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns jumlah row yang berhasil di update
   */
  async updateEventTemplateTwibbon(template, eventId, campaignerId) {
    return await this.eventService.updateEventTemplateTwibbon(
      template,
      eventId,
      campaignerId
    )
  }

  async deleteEvent(eventId, campaignerId) {
    return await this.eventService.deleteEvent(eventId, campaignerId)
  }

  async viewEvent(eventId, campaignerId) {
    return await this.eventService.viewDetailEvent(eventId, campaignerId)
  }

  async viewAllEvent(campaignerId) {
    return await this.eventService.viewByCampaigner(campaignerId)
  }

  async findEvent(namaEvent, campaignerId) {
    return await this.eventService.findByName(namaEvent, campaignerId)
  }
}

module.exports = Campaigner
