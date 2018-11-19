const path = require('path')
const logger = require('./logger')
const PkgConfig = require('./utils/pkgConfig')
const { mkdir, echo } = require('./utils/fsCombine')
const { isPathExists } = require('./utils/pathHelper')
const codeBase = require('./template/codeBase')

const createRepo = ctx => {
  const repoName = ctx.name
  const repoPath = path.resolve(repoName)
  const repoType = ['lib', 'node', 'web'].find(
    type => Boolean(ctx[type])
  ) || 'web'

  if (isPathExists(repoPath)) {
    logger.printError(
      `destination '${repoPath}' already exists`
    )
    return false
  }
  const isLib = repoType === 'lib'
  const isWeb = repoType === 'web'
  const isNode = repoType === 'node'
  const code = codeBase[repoType]
  const pkg = PkgConfig
    .from(repoName, {
      main: isLib ? 'lib.js' : 'index.js',
      repoType
    })
    .toJson()

  mkdir(repoPath).and(
    mkdir('src').and(
      echo(code, isLib ? 'lib.js' : 'index.js'),
      echo(codeBase['test'], 'lib.test.js')
        .if(isLib)
    ),
    echo(codeBase['html'], 'index.html')
        .if(isWeb),
    echo(pkg, 'package.json')
  ).do()
  return true
}

module.exports = createRepo