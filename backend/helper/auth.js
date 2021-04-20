const passport = require("passport")
const jwtStrategy = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt")

// addtional
require("dotenv").config()
const db = require("../config/database.config")
const relation = require("../config/relation.config")

// JWT
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: process.env.JWT_KEY,
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        const { participantId = "", campaignerId = "" } = payload.sub

        if (Date.now() >= payload.exp * 1000) {
          const err = new Error("Token sudah expired")
          err.status = 401
          return done(err)
        }

        const model = participantId != "" ? db.Participant : db.Campaigner
        const user = await model.findOne({
          include: [db.User],
          where: {
            id: participantId != "" ? participantId : campaignerId,
          },
        })
        if (!user) {
          const err = new Error("User not found")
          err.status = 401
          return done(err)
        }

        done(null, user)
      } catch (err) {
        done(err, false)
      }
    }
  )
)
