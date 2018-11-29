const path = require('path')
const logger = require('./logger')
const { mkdir } = require('./utils/fsCombine')
const { isPathExists } = require('./utils/pathHelper')
const init = require('./init')

const createRepo = ctx => {
  const repoName = ctx.name
  const repoPath = path.resolve(repoName)

  if (isPathExists(repoPath)) {
    logger.printError(
      `destination '${repoPath}' already exists`
    )
    return false
  }

  mkdir(repoPath).do()
  init({
    ...ctx,
    repoPath
  })
  return true
}

module.exports = createRepo