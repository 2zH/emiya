const path = require('path')

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

function getRootPath(filePath) {
  return findPkgConfig(filePath)
}

exports.isPathExists = isPathExists
exports.getRootPath = getRootPath