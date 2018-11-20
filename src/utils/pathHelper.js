const path = require('path')
const fs = require('fs-extra')

const findPkgConfig = filePath => {
  if (isPathExists(path.join(filePath, 'package.json'))) {
    return filePath
  }
  if (filePath === '/') {
    return false
  }
  return findPkgConfig(path.dirname(filePath))
}

function isPathExists(sourcePath) {
  return fs.pathExistsSync(sourcePath)
}

function getRootPath(filePath = path.resolve()) {
  return findPkgConfig(filePath)
}

exports.isPathExists = isPathExists
exports.getRootPath = getRootPath