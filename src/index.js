const {getFilesFromDirectory} = require('./get-files-from-directory')
const {processFiles} = require('./process-files')
const {sortFiles} = require('./sort-files')
const {defaultOptions} = require('./default-options')
const {CyclicDependencyError, DependencyNotFoundError} = require('./errors')

async function topoFiles(dir, options = {}) {
  const rawFiles = await getFilesFromDirectory(dir, options.ext)
  const files = processFiles(rawFiles, options.ext, options.comment, options.keyword)
  const sortedFiles = sortFiles(files)
  if (options.joinFiles !== false) {
    return joinFiles(sortedFiles, options.eol)
  }
  return sortedFiles
}

function joinFiles(files, eol = defaultOptions.eol) {
  return files
    .map((o) => o.commentHeader + o.file)
    .join(eol)
}

module.exports = {
  topoFiles,
  joinFiles,
  CyclicDependencyError,
  DependencyNotFoundError
}
