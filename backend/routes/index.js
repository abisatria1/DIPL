const express = require("express")
const router = express.Router()

// jwt
const passport = require("passport")
const auth = require("../helper/auth")
const passportJwt = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      const error = new Error("Unauthorized")
      error.status = 401
      return next(error)
    }
    req.user = user
    next()
  })(req, res, next)
}

const userRouter = require("./userRoute")
const campaignerRouter = require("./campaignerRoute")

router.use("/user", userRouter)
router.use("/campaigner", passportJwt, campaignerRouter)

module.exports = router
