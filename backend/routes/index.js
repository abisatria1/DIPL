const express = require("express")
const router = express.Router()
const { container } = require("../config/depedency-injection.config")
const userController = container.resolve("userController")
// jwt
const passport = require("passport")
const auth = require("../helper/auth")

// type user is 2 = ["campaigner", "participant"]
/**
 * Check if user was Authorized
 * @param {String} typeUser
 * @returns nextFunction
 */
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
const participantRouter = require("./participantRoute")
const eventRouter = require("./eventRoute")

router.use("/user/my", passportJwt(), userController.myProfile)
router.use("/user", userRouter)
router.use("/event", eventRouter)
router.use("/campaigner", passportJwt("campaigner"), campaignerRouter)
router.use("/participant", passportJwt("participant"), participantRouter)

module.exports = router
