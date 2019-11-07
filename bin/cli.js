#!/usr/bin/env node
const parseArgs = require('minimist')
const {topoFiles} = require('../index')

async function run(directory, options) {
  try {
    const output = await topoFiles(directory, options)
    process.stdout.write(output)
    process.exit(0)
  } catch (err) {
    process.stderr.write(err)
    process.exit(1)
  }
}

const {_: [directory], ...options} = parseArgs(process.argv.slice(2))

run(directory, options)
