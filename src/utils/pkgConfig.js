const logger = require('../logger')
const fs = require('fs-extra')
const path = require('path')

class PkgConfig {
  constructor(name = 'foo', opts = {}) {
    this.config = {
      name,
      ...opts
    }
    this.keys = Object.keys(this.config)
    this.repoType = this.config.repoType
    this.source = this.config.source
  }

  includes(key) {
    return this.keys.includes(key)
  }

  toJson() {
    return JSON.stringify(this.config, null, '\t')
  }

  static from(target, opts = {}) {
    if (typeof target === 'string') {
      return new PkgConfig(target, opts)
    }
    if (typeof target === 'object') {
      return new PkgConfig(target.name, { ...target, ...opts })
    }
    logger.printError('invaild value[PkgConfig]')
    return new PkgConfig()
  }

  static readFile(filePath) {
    const text = fs.readFileSync(
      filePath.endsWith('package.json') 
        ? filePath
        : path.join(filePath, 'package.json'),
      'utf8'
    )
    return PkgConfig.from(JSON.parse(text))
  }
}

module.exports = PkgConfig
