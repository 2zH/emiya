#!/usr/bin/env node

require('yargs')
  .command({
    command: ['new [name]'],
    desc: 'Create a new project',
    handler: require('./src/new'),
    builder: yargs => {
      yargs
        .option('lib', {
          demandOption: false,
          default: false,
          type: 'boolean'
        })
        .option('web', {
          demandOption: false,
          default: false,
          type: 'boolean'
        })
        .option('node', {
          demandOption: false,
          default: false,
          type: 'boolean'
        })
    }
  })
  .command({
    command: ['run'],
    desc: 'Build and execute.',
    handler: require('./src/scripts/run')
  })
  .command({
    command: ['test'],
    desc: 'Run the tests.',
    handler: require('./src/scripts/test')
  })
  .command({
    command: ['init'],
    desc: 'Create a new package in an existing directory.',
    handler: require('./src/init')
  })
  // .command({
  //   command: ['build'],
  //   desc: 'Compile the current project.',
  //   handler: require('./src/scripts/build')
  // })
  // .command({
  //   command: ['check'],
  //   desc: 'Analyze the current project, report syntax errors and fix it.',
  //   handler: require('./src/scripts/check')
  // })
  .parse()
