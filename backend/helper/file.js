const fs = require("fs")

/**
 * delete file with given path
 * @param {fs.PathLike} path
 */
const deleteFile = (path) => {
  try {
    fs.unlinkSync(path)
  } catch (err) {
    err.message = "Error delete file, file is not found or invalid path"
    err.status = 500
    throw err
  }
}

/**
 * Check if file is exists
 * @param {fs.PathLike} path
 * @returns bool if file exists or not
 */
const findFile = (path) => {
  return fs.existsSync(path)
}

/**
 * Count Number of files
 * @param {fs.PathLike} dir
 * @returns number of file on path
 */
const countFiles = (dir) => {
  return fs.readdirSync(dir)
}

const writeFile = (path, buffer) => {
  return fs.writeFileSync(path, buffer, "ascii")
}

module.exports = {
  deleteFile,
  findFile,
  countFiles,
  writeFile,
}
