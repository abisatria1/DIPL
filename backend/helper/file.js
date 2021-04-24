const fs = require("fs")

const deleteFile = (path) => {
  try {
    fs.unlinkSync(path)
  } catch (err) {
    err.message = "Error delete file, file is not found or invalid path"
    err.status = 500
    throw err
  }
}

const findFile = (path) => {
  return fs.existsSync(path)
}

const countFiles = (dir) => {
  return fs.readdirSync(dir)
}

module.exports = {
  deleteFile,
  findFile,
  countFiles,
}
