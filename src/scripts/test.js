const { getRootPath } = require('../utils/pathHelper')
const { runCLI } = require('jest-cli/build/cli')

const testRunner = ctx => {
  const rootPath = getRootPath(path.resolve())
  return runCLI({}, [rootPath])
}