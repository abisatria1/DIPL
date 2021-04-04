const express = require("express")
const router = express.Router()

const userRouter = require("./userRoute")
const campaignerRouter = require("./campaignerRoute")

router.use("/user", userRouter)
router.use("/campaigner", campaignerRouter)

module.exports = router
