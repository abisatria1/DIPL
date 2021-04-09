class userController {
  constructor({ userService }) {
    this.userService = userService

    this.login = this.login.bind(this)
    this.registerParticipant = this.registerParticipant.bind(this)
    this.registerCampaigner = this.registerCampaigner.bind(this)
  }

  async login(req, res, next) {
    try {
      const token = await this.userService.login(req.body)
      if (!token) {
        return res.sendError({}, "Invalid credentials", 401)
      }
      return res.sendSuccess({ jwtToken: token })
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

      const response = {
        id: result.id,
        username: result.user.username,
        email: result.user.email,
        nama_participant: result.nama_participant,
        userId: result.userId,
      }
      return res.sendSuccess(response, "Success", 201)
    } catch (err) {
      next(err)
    }
  }

  async registerCampaigner(req, res, next) {
    try {
      const { user, campaigner } = req.body
      const result = await this.userService.registerCampaigner(user, campaigner)

      const response = {
        id: result.id,
        username: result.user.username,
        email: result.user.email,
        nama_campaigner: result.nama_campaigner,
        notelp_campaigner: result.notelp_campaigner,
        maks_kuota_campaigner: result.maks_kuota_campaigner,
        userId: result.userId,
      }
      return res.sendSuccess(response, "Success", 201)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
