const express = require("express")
const router = express.Router()

// jwt
const passport = require("passport")
const auth = require("../helper/auth")

// type user is 2 = ["campaigner", "participant"]
const passportJwt = (typeUser) => {
  return (req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        const error = new Error("Unauthorized")
        error.status = 401
        return next(error)
      }
      if (typeUser == "campaigner") {
        if (!user.nama_campaigner) {
          const error = new Error("Unauthorized")
          error.status = 401
          return next(error)
        }
      } else if (typeUser == "participant") {
        if (!user.nama_participant) {
          const error = new Error("Unauthorized")
          error.status = 401
          return next(error)
        }
      }
      req.user = user

      next()
    })(req, res, next)
  }
}

const userRouter = require("./userRoute")
const campaignerRouter = require("./campaignerRoute")

router.use("/user", userRouter)
router.use("/campaigner", passportJwt("campaigner"), campaignerRouter)

module.exports = router
