const eventSchema = require("../services/event/event.schema")

const fileFilterForCreateTwibbon = () => {
  return fileFilterBySchema(eventSchema.createEventSchema)
}

const fileFilterBySchema = (schema) => {
  return (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/png"
    ) {
      if (schema) {
        return validateBody(req, schema, cb)
      }
    } else {
      const err = new Error("File extension doesnt match")
      err.status = 422
      cb(err, false)
    }
  }
}

const validateBody = (req, schema, cb) => {
  const result = schema.validate(req.body, { abortEarly: false })
  if (result.error) {
    let errorData = []
    result.error.details.map((item) => {
      let error = {
        path: item.path[0],
        message: item.message,
      }
      errorData.push(error)
    })
    let err = new Error("Validation failed")
    err.status = 422
    err.data = errorData
    return cb(err, false)
  }
  return cb(null, true)
}

module.exports = {
  fileFilterForCreateTwibbon,
}
