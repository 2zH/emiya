const { getRootPath } = require('../utils/pathHelper')
const { readFile } = require('../utils/pkgConfig')
const path = require('path')

const build = () => {
  const rootPath = getRootPath()
  const pkgConfig = readFile(rootPath)
  if (pkgConfig.repoType === 'lib') {
    const Bundler = require('rollup')
    const configBuilder = require('../utils/rollupConfig')
    const { formatEnum } = require('../constant')
    if (!pkgConfig.source) {
      throw TypeError('Missing source field in package.json')
    }
    const formatTypes = formatEnum.values()
      .filter(field => pkgConfig.includes(field))
      .map(field => formatEnum[field])
    const configs = configBuilder
      .of(pkgConfig.config)
      .createConfig(formatTypes)
    Promise.all(configs
      .map(async ([inputOpts, outputOpts]) => {
        const bundle = await Bundler.rollup(inputOpts)
        bundle.write(outputOpts)
      })
    )
  }

  if (pkgConfig.repoType === 'web') {
    // TODO
  }

  if (pkgConfig.repoType === 'node') {
    // TODO
  }
}

module.exports = build