const Joi = require("joi")

const validateBody = (schema = Joi.object()) => {
  return async (req, res, next) => {
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
      return res.sendError(errorData, "Validation failed", 422)
    }
    next()
  }
}

module.exports = validateBody
