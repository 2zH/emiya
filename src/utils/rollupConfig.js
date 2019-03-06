const { formatEnum } = require('../constant')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')

class RollupConfig {
  constructor(pkg) {
    this.pkg = pkg
    this.inputOpts = {
      input: pkg.source
    }
    this.plugins = [
      peerDepsExternal({
        includeDependencies: true
      })
    ]
    if (pkg.source.endsWith('ts') || pkg.source.endsWith('tsx')) {
      const typescript = require('rollup-plugin-typescript2')
      // const { getRootPath } = require('./pathHelper')
      // const rootPath = getRootPath()
      // console.log(path.join(rootPath, 'node_modules/typescript/lib'))
      this.plugins.push(typescript())
    }
  }

  createConfig(format) {
    if (Array.isArray(format)) {
      return format.map(this.createConfig.bind(this))
    }
    const inputOpts = {
      ...this.inputOpts,
      plugins: [...this.plugins]
    }
    const outputOps = {
      format,
      file: this.pkg[formatEnum[format]]
    }
    if (format !== 'esm') {
      const babel = require('rollup-plugin-babel')
      const babelConfig = this.pkg.babel || {}
      inputOpts.plugins.push(babel({
        ...babelConfig,
        extensions: ['ts', 'tsx', 'js', 'jsx']
      }))
    }
    if (format === 'umd') {
      outputOps.globals = this.pkg.globals || {}
    }
    return [inputOpts, outputOps]
  }

  static of(pkg) {
    return new RollupConfig(pkg)
  }
}

module.exports = RollupConfig
