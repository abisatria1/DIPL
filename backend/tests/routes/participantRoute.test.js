const supertest = require("supertest")
const app = require("../../app")
const db = require("../../config/database.config")
const User = require("../../services/user")
const { signJwtToken } = require("../../services/user/utils")
require("../../config/relation.config")

const request = supertest.agent(app)

const url = {
  createTwibbon: "/api/participant/twibbon/", //eventId
  uploadFotoDiri: "/api/participant/twibbon/", //eventId
  viewTwibbon: "/api/participant/twibbon/", //eventId
  deleteTwibbon: "/api/participant/twibbon/", //eventId / twibbonId
}

const participant = {
  username: "kadek",
  email: "abi.kadek@gmail.com",
  password: "inipassword",
  nama_participant: "kadek",
  foto_participant: "D:/killer.jpg",
}

const twibbon = {
  //
}

describe("Participant test case", () => {
  let token = ""
  beforeAll(async () => {
    await db.drop()
    await db.sync()
    const user = new User({ db })
    const registeredUser = await user.registerParticipant(
      {
        username: participant.username,
        email: participant.email,
        password: participant.password,
      },
      {
        nama_participant: participant.nama_participant,
      }
    )
    token = signJwtToken({ participantId: registeredUser.id })
  })
  afterAll(async () => {
    await db.close()
  })
  beforeEach(() => request.set("Authorization", token))

  describe("create twibbon test case", () => {
    it("Should create twibbon with correct data", (done) => {
      done()
    })
  })
})
