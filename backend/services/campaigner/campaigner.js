const Service = require("../Service")
const { eventService } = require("../index")
class Campaigner extends Service {
  constructor({ db, eventService }) {
    super({ db })
    this.eventService = eventService
    // this.id_user = id_user
    // this.email = email
    // this.password = password
    // this.nama = nama
    // this.no_hp = no_hp
  }

  async createEvent(eventBody) {
    const createdEvent = await this.eventService.createEvent(eventBody)
    return createdEvent
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
