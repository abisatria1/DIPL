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
      const campaigner = req.user
      const file = req.file
      const createdEvent = await this.campaignerService.createEvent({
        ...req.body,
        template_twibbon: file.path,
        campaignerId: campaigner.id,
      })
      return res.sendSuccess(createdEvent, "Berhasil", 201)
    } catch (err) {
      next(err)
    }
  }

  async updateEvent(req, res, next) {
    try {
      const { eventId } = req.params
      const campaignerId = req.user.id
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
      const campaignerId = req.user.id
      await this.campaignerService.deleteEvent(eventId, campaignerId)
      return res.sendSuccess()
    } catch (err) {
      next(err)
    }
  }

  async viewEvent(req, res, next) {
    try {
      const { eventId } = req.params
      const campaignerId = req.user.id
      const result = await this.campaignerService.viewEvent(
        eventId,
        campaignerId
      )
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }

  async viewAllEvent(req, res, next) {
    const campaignerId = req.user.id
    const result = await this.campaignerService.viewAllEvent(campaignerId)
    return res.sendSuccess(result)
  }

  async findEvent(req, res, next) {
    const { namaEvent } = req.query
    const campaignerId = req.user.id
    const result = await this.campaignerService.findEvent(
      namaEvent,
      campaignerId
    )
    return res.sendSuccess(result)
  }
}

module.exports = campaignerController
