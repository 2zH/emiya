const Enum = require('../utils/enum')

const formatEnum = new Enum([
  ['esm', 'module'],
  ['cjs', 'main'],
  ['umd', 'umd']
])

const basePkgConfig =  {
  main: 'dist/index.js',
  module: 'dist/index.es.js',
  file: ['dist', 'src'],
  version: '0.0.1',
  license: 'MIT',
  dependencies: {}
}

exports.formatEnum = formatEnum
exports.basePkgConfig = basePkgConfig