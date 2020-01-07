const chalk = require('chalk')
const {
  formatErrorMessage, getIndexFromErrorPosition, createCodeSnippet
} = require('pg-error-snippet')
const {defaultOpts} = require('./default-opts')

function sqlModulesErrorOutput(err, opts = {}) {
  const fileNameList = createFileNameList([{name: err.fileName}], 0, opts.showColors)
  const message = formatErrorMessage(err.message, '[sql-modules]: ', opts.showColors)
  const filePosition = getLinePositionFromError(err, opts.eol)
  const snippet = createCodeSnippet(filePosition, err.file, opts)
  return fileNameList.join('\n') + '\n' +
    message + '\n\n' +
    snippet + '\n'
}

function postgresErrorOutput(err, query, files, opts = {}) {
  const index = getIndexFromErrorPosition(err.position, query)
  const {fileIdx, filePosition} = getErrorCoords(index, files, opts)
  const fileNameList = createFileNameList(files, fileIdx, opts.showColors)
  const message = formatErrorMessage(err.message, opts.label, opts.showColors)
  const snippet = createCodeSnippet(filePosition, files[fileIdx].file, opts)
  return fileNameList.join('\n') + '\n' +
    message + '\n\n' +
    snippet + '\n'
}

function getErrorCoords(index, files, opts = {}) {
  const fileLengths = getFileEndIndexes(files, opts.eol)
  const fileIdx = (() => {
    const idx = fileLengths.findIndex((len) => len > index)
    return idx >= 0 ? idx : fileLengths.length - 1
  })()
  const filePosition = (() => {
    const prevFileLength = fileLengths[fileIdx - 1] || 0
    const {commentHeader} = files[fileIdx]
    return index - prevFileLength - commentHeader.length
  })()
  return {fileIdx, filePosition}
}

function getFileEndIndexes(files, eol = defaultOpts.eol) {
  const eolLength = eol.length
  return files.reduce((acc, o, idx) => {
    const prev = acc[idx - 1] || 0
    acc.push(prev + o.commentHeader.length + o.file.length + eolLength)
    return acc
  }, [])
}

function createFileNameList(files, fileIdx, showColors = defaultOpts.showColors) {
  const happyFilesNames = files
    .slice(0, fileIdx)
    .map((o) => showColors ? chalk.green.bold(o.name) : o.name)
  const sadFileName = (() => {
    const name = `> ${files[fileIdx].name}`
    return showColors ? chalk.red.bold(name) : name
  })()
  return [...happyFilesNames, sadFileName]
}

function getLinePositionFromError(err, eol = defaultOpts.eol) {
  const {file, line, position} = err
  return file
    .split('\n')
    .slice(0, line)
    .reduce((acc, line) => acc + line.length + eol.length, position)
}

module.exports = {
  sqlModulesErrorOutput,
  postgresErrorOutput
}
