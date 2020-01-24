#!/usr/bin/env node
const fs = require('fs')
const {promisify} = require('util')
const parseArgs = require('minimist')
const {topoFiles} = require('../index')
const writeFile = promisify(fs.writeFile)

async function run(directory, options) {
  try {
    const output = await topoFiles(directory, options)
    if (options.outFile) {
      await writeFileToDisk(options.outFile, output)
    } else {
      process.stdout.write(output)
    }
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

async function writeFileToDisk(filePath, output) {
  try {
    await writeFile(filePath, output)
  } catch(err) {
    err.message = `[topo-files]: Error writing to file "${filePath}" ${err.message}`
    throw err
  }
}

const {_: [directory], ...options} = parseArgs(process.argv.slice(2))

// TODO: whitelist of valid options

run(directory, options)
  