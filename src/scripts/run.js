const path = require('path')
const { getRootPath } = require('../utils/pathHelper')
const { readFile } = require('../utils/pkgConfig')

const runScripts = ctx => {
  const { repoType } = readFile(path.resolve('package.json')).config
  const rootPath = getRootPath()

  if (repoType === 'web') {
    const Bundler = require('parcel-bundler')
    const entryFile = path.join(rootPath, 'index.html')
    const bundler = new Bundler(entryFile, {})
    return bundler.serve()
  }

  if (repoType === 'node') {
    const { execSync: executer } = require('child_process')
    const indexPath = path.join(rootPath, 'src/index.js')

    return executer(`node ${indexPath}`, {
      stdio: 'inherit'
    })
  }

  if (repoType === 'lib') {
    const { runCLI } = require('jest-cli/build/cli')
    return runCLI({}, [rootPath])
  }

  return false
}

module.exports = runScripts