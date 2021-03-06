const Service = require("../Service")
/**
 * Class ini berisi terkait dengan bisnis logic dari campaigner
 */
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
   * create event
   * @param {Object} eventBody
   * @returns Promise<Event>
   */
  async createEvent(eventBody) {
    return await this.eventService.createEvent(eventBody)
  }
  /**
   * Update event
   * @param {Object} eventBody
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns Promise<Event>
   */
  async updateEvent(eventBody, eventId, campaignerId) {
    return await this.eventService.updateEvent(eventBody, eventId, campaignerId)
  }
  /**
   * change template event twibbon
   * @param {Object} template
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns Promise<bool>
   */
  async updateEventTemplateTwibbon(template, eventId, campaignerId) {
    return await this.eventService.updateEventTemplateTwibbon(
      template,
      eventId,
      campaignerId
    )
  }
  /**
   * Delte Event
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns Promise<bool>
   */
  async deleteEvent(eventId, campaignerId) {
    return await this.eventService.deleteEvent(eventId, campaignerId)
  }
  /**
   * Show specific event
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns Promise<Event>
   */
  async viewEvent(eventId, campaignerId) {
    return await this.eventService.viewDetailEvent(eventId, campaignerId)
  }
  /**
   * Show all event
   * @param {Number} campaignerId
   * @returns Promise<Event>
   */
  async viewAllEvent(campaignerId) {
    return await this.eventService.viewByCampaigner(campaignerId)
  }
  /**
   * show event with given Name Event on campaigner
   * @param {String} namaEvent
   * @param {Number} campaignerId
   * @returns Promise<Event>
   */
  async findEvent(namaEvent, campaignerId) {
    return await this.eventService.findByName(namaEvent, campaignerId)
  }

  /**
   * Mencari data seluruh participant yang sedang mengikuti event
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns Promise<Event>
   */
  async viewEventParticipant(eventId, campaignerId) {
    return await this.eventService.viewEventParticipant(eventId, campaignerId)
  }

  /**
   * update data profile campaigner
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns Promise<Event>
   */
  async updateProfile(user, username, nama_campaigner, notelp_campaigner) {
    const userModel = user.user

    const isExistUsername = await this.db.User.findOne({ where: { username } })
    if (isExistUsername && isExistUsername.id != userModel.id) {
      throw this.createError("Username has been used", 400)
    }

    await userModel.update({ username })

    return await user.update({
      nama_campaigner,
      notelp_campaigner,
      user: {
        username,
      },
    })
  }

  createError(message, code) {
    const error = new Error(message)
    error.code = code
    return error
  }
}

module.exports = Campaigner
