class userController {
  constructor({ userService }) {
    this.userService = userService

    this.login = this.login.bind(this)
    this.registerParticipant = this.registerParticipant.bind(this)
    this.registerCampaigner = this.registerCampaigner.bind(this)
  }

  async login(req, res, next) {
    try {
      const login = await this.userService.login(req.body)
      if (!login) {
        return res.sendError({}, "Invalid credentials", 401)
      }
      return res.sendSuccess()
    } catch (err) {
      next(err)
    }
  }

  async registerParticipant(req, res, next) {
    try {
      const { user, participant } = req.body
      const result = await this.userService.registerParticipant(
        user,
        participant
      )
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }

  async registerCampaigner(req, res, next) {
    try {
      const { user, campaigner } = req.body
      const result = await this.userService.registerCampaigner(user, campaigner)
      return res.sendSuccess(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
