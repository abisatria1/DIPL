const Service = require("../Service")
class Campaigner extends Service {
  constructor({ db, eventService }) {
    super({ db })
    this.eventService = eventService
  }

  async createEvent(eventBody) {
    return await this.eventService.createEvent(eventBody)
  }

  async updateEvent(eventBody, eventId, campaignerId) {
    return await this.eventService.updateEvent(eventBody, eventId, campaignerId)
  }

  async deleteEvent(eventId, campaignerId) {
    return await this.eventService.deleteEvent(eventId, campaignerId)
  }

  async viewEvent(eventId) {
    return await this.eventService.viewDetailEvent(eventId)
  }

  async viewAllEvent(campaignerId) {
    return await this.eventService.viewByCampaigner(campaignerId)
  }

  async findEvent(namaEvent, campaignerId) {
    return await this.eventService.findByName(namaEvent, campaignerId)
  }
}

module.exports = Campaigner
