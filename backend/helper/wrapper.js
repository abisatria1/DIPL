/**
 * Wrapper for HTTP Response
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 * @returns Express.Response
 */
const wrapperMiddleware = (req, res, next) => {
  res.sendSuccess = (data = {}, message = "Sucess", code = 200) => {
    return res.status(code).send({
      ok: true,
      message,
      code,
      next,
      data,
    })
  }

  res.sendError = (errors = {}, message = "Fail", code = 400) => {
    return res.status(code).send({
      ok: false,
      message,
      code,
      data: errors,
    })
  }

  return next()
}

module.exports = wrapperMiddleware
