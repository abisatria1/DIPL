class campaignerController {
  constructor({ campaignerService }) {
    this.campaignerService = campaignerService

    this.createEvent = this.createEvent.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.viewAllEvent = this.viewAllEvent.bind(this)
    this.viewEvent = this.viewEvent.bind(this)
    this.findEvent = this.findEvent.bind(this)
  }

  async createEvent(req, res, next) {
    try {
      const createdEvent = await this.campaignerService.createEvent(req.body)
      return res.sendSuccess(createdEvent)
    } catch (err) {
      next(err)
    }
  }

  async updateEvent(req, res, next) {
    try {
      const { eventId } = req.params
      const { campaignerId } = req.query
      const result = await this.campaignerService.updateEvent(
        req.body,
        eventId,
        campaignerId
      )
      return res.sendSuccess()
    } catch (err) {
      next(err)
    }
  }

  async deleteEvent(req, res, next) {
    try {
      const { eventId } = req.params
      const { campaignerId } = req.query
      await this.campaignerService.deleteEvent(eventId, campaignerId)
      return res.sendSuccess()
    } catch (err) {
      next(err)
    }
  }

  async viewEvent(req, res, next) {
    try {
      const { eventId } = req.params
      const result = await this.campaignerService.viewEvent(eventId)
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }

  async viewAllEvent(req, res, next) {
    const { campaignerId } = req.query
    const result = await this.campaignerService.viewAllEvent(campaignerId)
    return res.sendSuccess(result)
  }

  async findEvent(req, res, next) {
    const { namaEvent, campaignerId } = req.query
    const result = await this.campaignerService.findEvent(
      namaEvent,
      campaignerId
    )
    return res.sendSuccess(result)
  }
}

module.exports = campaignerController
