/**
 * Filter File using JOI Schema
 * @param {Joi.object} schema
 * @returns callback bool (True/False)
 */
const fileFilterBySchema = (
  schema,
  mimetype = ["image/jpeg", "image/jpg", "image/gif", "image/png"]
) => {
  return (req, file, cb) => {
    if (mimetype.includes(file.mimetype)) {
      if (schema) {
        return validateBody(req, schema, cb);
      } else {
        return cb(null, true);
      }
    } else {
      const err = new Error("File extension doesnt match");
      err.status = 422;
      cb(err, false);
    }
  };
};
/**
 * Validate payload with Joi Schema
 * @param {Express.request} req
 * @param {Joi.object} schema
 * @param {Express.NextFunction} cb
 * @returns callback
 */
const validateBody = (req, schema, cb) => {
  const result = schema.validate(req.body, { abortEarly: false });
  if (result.error) {
    let errorData = [];
    result.error.details.map((item) => {
      let error = {
        path: item.path[0],
        message: item.message,
      };
      errorData.push(error);
    });
    let err = new Error("Validation failed");
    err.status = 422;
    err.data = errorData;
    return cb(err, false);
  }
  return cb(null, true);
};

module.exports = {
  fileFilterBySchema,
};
