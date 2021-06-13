const express = require("express")
const { container } = require("../config/depedency-injection.config")
const userController = container.resolve("userController")
const router = express.Router()

// validator
const validateBody = require("../middleware/bodyValidator")
const schema = require("../services/user/user.schema")

router
  .route("/login")
  .post(validateBody(schema.loginSchema), userController.login)
router
  .route("/register/participant")
  .post(
    validateBody(schema.registerParticipantSchema),
    userController.registerParticipant
  )
router
  .route("/register/campaigner")
  .post(
    validateBody(schema.registerCampaignerSchema),
    userController.registerCampaigner
  )

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
        const error = new Error("Unauthorized, no user found")
        error.status = 401
        return next(error)
      }
      if (typeUser == "campaigner") {
        if (!user.nama_campaigner) {
          const error = new Error("Unauthorized, not campaigner")
          error.status = 401
          return next(error)
        }
      } else if (typeUser == "participant") {
        if (!user.nama_participant) {
          const error = new Error("Unauthorized, not particant")
          error.status = 401
          return next(error)
        }
      }
      req.user = user

      next()
    })(req, res, next)
  }
}

router.route("/my", passportJwt(), userController.myProfile)
router
  .route("/update/email")
  .patch(
    passportJwt(),
    validateBody(schema.updateEmailSchema),
    userController.updateEmail
  )

router
  .route("/update/password")
  .patch(
    passportJwt(),
    validateBody(schema.updatePasswordSchema),
    userController.updatePassword
  )

module.exports = router
