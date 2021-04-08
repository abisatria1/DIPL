const supertest = require("supertest")
const app = require("../../app")
const db = require("../../config/database.config")
require("../../config/relation.config")

const request = supertest.agent(app)

const url = {
  login: "/api/user/login",
  registerParticipant: "/api/user/register/participant",
  registerCampaigner: "/api/user/register/campaigner",
}

const participant = {
  username: "kadek",
  email: "abi.kadek@gmail.com",
  password: "inipassword",
  nama_participant: "kadek",
}

const campaigner = {
  username: "campaigner1",
  email: "campaigner@gmail.com",
  password: "inipassword",
  nama_campaigner: "campaigner",
  notelp_campaigner: "0821491823",
}

describe("User tests case", () => {
  beforeAll(async () => await db.sync({ force: true }))
  afterAll(async () => await db.sync({ force: true }))

  describe(`Register participant test case to ${url.registerParticipant}`, () => {
    it("Should create participant when register with valid participant data", (done) => {
      request
        .post(url.registerParticipant)
        .send({
          user: {
            username: participant.username,
            password: participant.password,
            email: participant.email,
          },
          participant: {
            nama_participant: participant.nama_participant,
          },
        })
        .expect(201)
        .then((response) => {
          expect(response.status).toEqual(201)
          expect(response.body.data).toHaveProperty(
            "username",
            participant.username,
            "email",
            participant.email,
            "nama_participant",
            participant.nama_participant
          )
          done()
        })
    })

    it("Should not create participant when register with duplicate email or username", (done) => {
      request
        .post(url.registerParticipant)
        .send({
          user: {
            username: participant.username,
            password: participant.password,
            email: participant.email,
          },
          participant: {
            nama_participant: participant.nama_participant,
          },
        })
        .expect(400)
        .then((response) => {
          expect(response.status).toEqual(400)
          expect(response.body.message).toEqual(
            "Email or Username has been used"
          )
          done()
        })
    })
  })

  describe(`Register campaigner test case to ${url.registerCampaigner}`, () => {
    it("Should create campaigner when register with valid campaigner data", (done) => {
      request
        .post(url.registerCampaigner)
        .send({
          user: {
            username: campaigner.username,
            password: campaigner.password,
            email: campaigner.email,
          },
          campaigner: {
            nama_campaigner: campaigner.nama_campaigner,
            notelp_campaigner: campaigner.notelp_campaigner,
          },
        })
        .expect(201)
        .then((response) => {
          expect(response.status).toEqual(201)
          expect(response.body.data).toHaveProperty(
            "username",
            campaigner.username,
            "email",
            campaigner.email,
            "nama_campaigner",
            campaigner.nama_campaigner,
            "notelp_campaigner",
            campaigner.notelp_campaigner,
            "maks_kuota_campaigner"
          )
          done()
        })
    })

    it("Should not create campaigner when register with duplicate email or username", (done) => {
      request
        .post(url.registerCampaigner)
        .send({
          user: {
            username: campaigner.username,
            password: campaigner.password,
            email: campaigner.email,
          },
          campaigner: {
            nama_campaigner: campaigner.nama_campaigner,
            notelp_campaigner: campaigner.notelp_campaigner,
          },
        })
        .expect(400)
        .then((response) => {
          expect(response.status).toEqual(400)
          expect(response.body.message).toEqual(
            "Email or Username has been used"
          )
          done()
        })
    })
  })

  describe(`Login tests case to ${url.login}`, () => {
    it("should login with email and password", (done) => {
      request
        .post(url.login)
        .send({
          email: participant.email,
          password: participant.password,
        })
        .expect(200)
        .then((response) => {
          expect(response.status).toEqual(200)
          done()
        })
    })

    it("should not login with invalid email and password", (done) => {
      request
        .post(url.login)
        .send({
          email: "invalid@email.com",
          password: "asdasdasdkk",
        })
        .expect(401)
        .then((response) => {
          expect(response.status).toEqual(401)
          expect(response.body.message).toEqual("Invalid credentials")
          done()
        })
    })
  })
})
