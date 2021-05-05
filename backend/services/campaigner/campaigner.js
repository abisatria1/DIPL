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
   * create event
   * @param {Event.body} eventBody
   * @returns Promise<Event>
   */
  async createEvent(eventBody) {
    return await this.eventService.createEvent(eventBody)
  }
  /**
   * Update event
   * @param {Event.body} eventBody
   * @param {Number} eventId
   * @param {Number} campaignerId
   * @returns Promise<Event>
   */
  async updateEvent(eventBody, eventId, campaignerId) {
    return await this.eventService.updateEvent(eventBody, eventId, campaignerId)
  }
  /**
   * change template event twibbon
   * @param {fs.File} template
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
}

module.exports = Campaigner
