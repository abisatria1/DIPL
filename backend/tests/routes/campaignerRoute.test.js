const supertest = require("supertest")
const app = require("../../app")
const db = require("../../config/database.config")
const { findFile, countFiles } = require("../../helper/file")
const User = require("../../services/user")
const { signJwtToken } = require("../../services/user/utils")
require("../../config/relation.config")

const request = supertest.agent(app)

const url = {
  login: "/api/user/login",
  registerCampaigner: "/api/user/register/campaigner",
  createEvent: "/api/campaigner/event",
  viewAllEvent: "/api/campaigner/event",
  viewDetailEvent: "/api/campaigner/event/",
  updateEvent: "/api/campaigner/event/",
  updateTemplateTwibbon: "/api/campaigner/event/template/",
  deleteEvent: "/api/campaigner/event/",
  findEventByName: "/api/campaigner/find/event?namaEvent=",
}

const campaigner = {
  username: "campaigner1",
  email: "campaigner@gmail.com",
  password: "inipassword",
  nama_campaigner: "campaigner",
  notelp_campaigner: "0821491823",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUd2VlYnoiLCJzdWIiOnsiY2FtcGFpZ25lcklkIjoxfSwiaWF0IjoxNjE4OTM1OTA4NTUyLCJleHAiOjE2MTg5MzU5OTQ5NTJ9.HGdOkg-yc71GDFBokn6odlFobphsAcCLo3Kwolxgh8k",
}

const event = {
  nama_event: "Dana",
  tanggal_event: "2020-02-01",
  jumlah_anggota: 120,
  template_twibbon: `D:/Logo HW.png`,
  deskripsi_event: "mantap",
}

const updatedEvent = {
  nama_event: "HEHEHE",
  tanggal_event: "2020-02-01",
  jumlah_anggota: 200,
  deskripsi_event: "mantap bener dah",
  template_twibbon: "D:/foto abi.jpg",
}

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    )

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      }
    }
  },
})

describe("Campaigner route tests case", () => {
  beforeAll(async () => {
    await db.drop()
    await db.sync()
    const user = new User({ db })
    await user.registerCampaigner(
      {
        username: campaigner.username,
        email: campaigner.email,
        password: campaigner.password,
      },
      {
        nama_campaigner: campaigner.nama_campaigner,
        notelp_campaigner: campaigner.notelp_campaigner,
      }
    )
  })
  afterAll(async () => {
    await db.close()
  })
  beforeEach(() => request.set("Authorization", campaigner.token))

  const event = {
    nama_event: "Dana",
    tanggal_event: "2020-02-01",
    jumlah_anggota: 100,
    template_twibbon: `D:/Logo HW.png`,
    deskripsi_event: "mantap",
  }

  describe(`Create event test case `, () => {
    it("Should not create if invalid body data", (done) => {
      request
        .post(url.createEvent)
        .field("nama_event", "")
        .field("tanggal_event", event.tanggal_event)
        .field("jumlah_anggota", event.jumlah_anggota)
        .field("deskripsi_event", event.deskripsi_event)
        .attach("template_twibbon", event.template_twibbon)
        .then((response) => {
          expect(response.status).toEqual(422)
          done()
        })
    })

    it("Should create event with valid data", (done) => {
      request
        .post(url.createEvent)
        .field("nama_event", event.nama_event)
        .field("tanggal_event", event.tanggal_event)
        .field("jumlah_anggota", event.jumlah_anggota)
        .field("deskripsi_event", event.deskripsi_event)
        .attach("template_twibbon", event.template_twibbon)
        .then((response) => {
          expect(response.status).toEqual(201)
          expect(response.body.data).toHaveProperty(
            "id",
            "nama_event",
            event.nama_event,
            "tanggal_event",
            "jumlah_anggota",
            "deskripsi_event",
            event.deskripsi_event,
            "template_twibbon",
            "createdAt",
            "updatedAt"
          )
          done()
        })
    })
  })

  describe(`find event test case `, () => {
    it("Should return all campaigner event", (done) => {
      request.get(url.viewAllEvent).then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.data).toContainObject({ id: expect.any(Number) })
        expect(response.body.data).toContainObject({
          ...event,
          template_twibbon: expect.any(String),
          tanggal_event: expect.any(String),
        })
        expect(response.body.data).toContainObject({
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
        done()
      })
    })

    it("Should return one event", (done) => {
      request.get(url.viewDetailEvent + "1").then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.data).toHaveProperty(
          "id",
          "nama_event",
          event.nama_event,
          "tanggal_event",
          "jumlah_anggota",
          "deskripsi_event",
          event.deskripsi_event,
          "template_twibbon",
          "createdAt",
          "updatedAt"
        )
        done()
      })
    })

    it("Should not return event when event not found", (done) => {
      request.get(url.viewDetailEvent + "2").then((response) => {
        expect(response.status).toEqual(400)
        done()
      })
    })

    it("Should get event by name", (done) => {
      request.get(url.findEventByName + event.nama_event).then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.data).toContainObject({ id: expect.any(Number) })
        expect(response.body.data).toContainObject({
          ...event,
          template_twibbon: expect.any(String),
          tanggal_event: expect.any(String),
        })
        expect(response.body.data).toContainObject({
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
        done()
      })
    })

    it("Should not get event by name", (done) => {
      request.get(url.findEventByName + "xxxxxxxxxxx").then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body.data).toEqual([])
        done()
      })
    })
  })

  describe(`updated event test case`, () => {
    it("Should not update event when invalid body data", (done) => {
      request
        .patch(url.updateEvent + "1")
        .send({ ...updatedEvent, nama_event: undefined })
        .then((response) => {
          expect(response.status).toEqual(422)
          done()
        })
    })

    it("Should not update event when event not found", (done) => {
      request
        .patch(url.updateEvent + "2")
        .send({ ...updatedEvent, template_twibbon: undefined })
        .then((response) => {
          expect(response.status).toEqual(400)
          done()
        })
    })

    it("Should update event with valid data", (done) => {
      request
        .patch(url.updateEvent + "1")
        .send({ ...updatedEvent, template_twibbon: undefined })
        .then((response) => {
          expect(response.status).toEqual(200)
          // check data is updated or not
          request.get(url.viewDetailEvent + "1").then((response) => {
            expect(response.body.data).toHaveProperty(
              "id",
              "nama_event",
              updatedEvent.nama_event,
              "tanggal_event",
              "jumlah_anggota",
              "deskripsi_event",
              updatedEvent.deskripsi_event,
              "template_twibbon",
              "createdAt",
              "updatedAt"
            )
            done()
          })
        })
    })

    it("Should not update twibbon template if no photo upload", (done) => {
      request.patch(url.updateTemplateTwibbon + "1").then((response) => {
        expect(response.status).toEqual(422)
        done()
      })
    })

    it("Should not update twibbon template if event not found", (done) => {
      const dir = "image/template"
      const beforeUploadCount = countFiles(dir)
      request
        .patch(url.updateTemplateTwibbon + "2")
        .attach("template_twibbon", updatedEvent.template_twibbon)
        .then((response) => {
          expect(response.status).toEqual(400)
          expect(countFiles(dir)).toEqual(beforeUploadCount)
          done()
        })
    })

    it("Should update twibbon template with valid data", (done) => {
      request
        .patch(url.updateTemplateTwibbon + "1")
        .attach("template_twibbon", updatedEvent.template_twibbon)
        .then((response) => {
          expect(response.status).toEqual(200)
          request.get(url.viewDetailEvent + "1").then((response) => {
            const { template_twibbon } = response.body.data
            expect(findFile(template_twibbon)).toEqual(true)
            done()
          })
        })
    })
  })

  describe(`delete event test case`, () => {
    it("Should not delete event when event not found", (done) => {
      request.delete(url.deleteEvent + "2").then((response) => {
        expect(response.status).toEqual(400)
        done()
      })
    })

    it("Should delete event", (done) => {
      request.get(url.viewDetailEvent + "1").then((response) => {
        let old_twibbon
        old_twibbon = response.body.data.template_twibbon
        request.delete(url.deleteEvent + "1").then((response) => {
          expect(response.status).toEqual(200)
          expect(findFile(old_twibbon)).toEqual(false)
          // check data is deleted or not
          request.get(url.viewDetailEvent + "1").then((response2) => {
            expect(response2.status).toEqual(400)
            done()
          })
        })
      })
    })
  })

  describe("Authorization test case", () => {
    it("Should not allow to access api when invalid auth token", (done) => {
      request.set("Authorization", "")
      request.post(url.viewAllEvent).then((response) => {
        expect(response.status).toEqual(401)
        done()
      })
    })
  })
})
