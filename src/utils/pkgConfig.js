const logger = require('../logger')
const fs = require('fs-extra')

class PkgConfig {
  constructor(name = 'foo', opts = {}) {
    this.config = {
      ...opts,
      name,
      version: opts.version || '1.0.0',
      main: opts.main || 'main.js',
      license: opts.license || 'MIT',
      dependencies: opts.dependencies || {}
    }
  }

  toJson() {
    return JSON.stringify(this.config, null, '\t')
  }

  static from(target, opts) {
    if (typeof target === 'string') {
      return new PkgConfig(target, opts)
    }
    if (typeof target === 'object') {
      const { name, ...opts } = target
      return new PkgConfig(name, opts)
    }
    logger.printError('invaild value[PkgConfig]')
    return false
  }

  static readFile(filePath) {
    const text = fs.readFileSync(filePath)
    return PkgConfig.from(JSON.parse(text))
  }
}

module.exports = PkgConfig