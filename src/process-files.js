const path = require('path')
const {defaultOptions} = require('./default-options')

function processFiles(rawFiles, ext, comment, keyword, eol) {
  const regex = makeRegexFromKeyword(comment, keyword)
  return rawFiles.map((file) => processFile(file, regex, ext, comment, eol))
}

function makeRegexFromKeyword(p = defaultOptions.comment, k = defaultOptions.keyword) {
  const comment = makeSafeRegexVariable(p)
  const keyword = makeSafeRegexVariable(k)
  return new RegExp(`^\\s*${comment}\\s*${keyword}\\s+(\\S+)`)
}

// https://stackoverflow.com/questions/494035#494122
function makeSafeRegexVariable(unsafeVar) {
  return unsafeVar.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}

function processFile({name, file}, regex, ext, comment, eol) {
  const commentHeader = makeCommentHeader(name, comment, eol)
  const {dependencies: deps, content} = separateDependeciesFromContent(file, regex, eol)
  const rawDependencies = extractDependencies(deps, regex)
  const dependencies = rawDependencies.map(({dep}) => resolveDependency(dep, name, ext))
  return {name, file, commentHeader, rawDependencies, dependencies, content}
}

function makeCommentHeader(name, comment = defaultOptions.comment, eol = defaultOptions.eol) {
  return `${comment} file: ${name}${eol}`
}

function separateDependeciesFromContent(file, regex, eol = defaultOptions.eol) {
  const lines = file.split(eol)
  const contentIdx = lines.findIndex((line) => (
    line.trim() && !regex.test(line)
  ))
  return {
    dependencies: lines.slice(0, contentIdx),
    content: lines.slice(contentIdx).join(eol)
  }
}

function extractDependencies(lines, regex) {
  return lines
    .map((dep, idx) => ({dep: extractDependecyFromLine(dep, regex), idx}))
    .filter((line) => line.dep.trim())
}

function extractDependecyFromLine(line, regex) {
  const match = line.match(regex)
  return match ? match[1] : ''
}

function resolveDependency(target, source, ext) {
  const dep = ensureFileExtAppended(target, ext)
  return path.join(path.dirname(source), dep)
}

function ensureFileExtAppended(filePath, ext = defaultOptions.ext) {
  const p = path.parse(filePath)
  return path.join(p.dir, p.name + ext)
}

module.exports = {
  processFiles,
  makeRegexFromKeyword,
  processFile,
  separateDependeciesFromContent,
  extractDependencies,
  extractDependecyFromLine,
  resolveDependency,
  ensureFileExtAppended,
  makeCommentHeader,
}
