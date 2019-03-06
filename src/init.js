const path = require('path')
const PkgConfig = require('./utils/pkgConfig')
const { mkdir, echo, from } = require('./utils/fsCombine')
const codeBase = require('./template/codeBase')
const { basePkgConfig } = require('./constant')

const createRepo = ctx => {
  const repoType = ['lib', 'node', 'web'].find(
    type => Boolean(ctx[type])
  ) || 'web'
  const repoPath = ctx.repoPath || path.resolve()
  const repoName = ctx.name || path.basename(repoPath)
  const isLib = repoType === 'lib'
  const isWeb = repoType === 'web'
  const code = codeBase[repoType]
  // TODO: friendly log with duplicated file
  const pkg = PkgConfig
    .from(repoName, {
      source: `src/${isLib ? 'lib.js' : 'index.js'}`,
      repoType,
      ...basePkgConfig
    })
    .toJson()

  from(repoPath).and(
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