const Service = require("../Service")

class Campaigner extends Service {
  id_user
  email
  password
  nama
  no_hp

  constructor(id_user, email, password, nama, no_hp) {
    super()
    this.id_user = id_user
    this.email = email
    this.password = password
    this.nama = nama
    this.no_hp = no_hp
  }

  createEvent(eventBody) {
    const event = eventService()
    const createdEvent = event.createEvent(eventBody)
    return createdEvent
  }

  updateEvent(eventBody, idEvent) {
    const event = eventService()
    return event.updateEvent(eventBody, idEvent)
  }

  deleteEvent(idEvent) {
    const event = eventService()
    return event.deleteEvent(idEvent)
  }

  viewEvent(idEvent) {
    const event = eventService()
    return event.viewEvent(idEvent)
  }

  findEvent(namaEvent) {
    const event = eventService()
    return event.findEvent(namaEvent)
  }
}

module.exports = Campaigner
