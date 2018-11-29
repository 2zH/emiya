const { getRootPath } = require('../utils/pathHelper')
const { runCLI } = require('jest-cli/build/cli')
const path = require('path')

const testRunner = ctx => {
  const rootPath = getRootPath(path.resolve())
  return runCLI({}, [rootPath])
}

module.exports = testRunner