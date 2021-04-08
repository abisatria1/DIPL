require("./config/depedency-injection.config").setup()
const express = require("express")
const app = express()
const router = require("./routes")
const bodyParser = require("body-parser")
const wrapperMiddleware = require("./helper/wrapper")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(wrapperMiddleware)

app.use("/api", router)

// error handler
app.use((req, res, next) => {
  const error = new Error("Route not found")
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  const error = err.message || "Server Error"
  const status = err.status || 500
  console.log(err)
  const data = err.data ? err.data : {}
  res.sendError(data, error, status)
})

module.exports = app
