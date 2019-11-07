const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const toposort = require('toposort')
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

const defaultOptions = {
  ext: 'sql',
  prefix: '--',
  keyword: 'requires'
}

async function topoFiles(dir, {ext, prefix, keyword} = {}) {
  const rawFiles = await getFilesFromDir(dir, ext)
  return buildOutput(rawFiles, ext, prefix, keyword)
}

async function getFilesFromDir(rootDir, ext = defaultOptions.ext) {
  const filePaths = await getFilePathsRecursive(rootDir)
  return Promise.all(
    filePaths
      .filter((filePath) => path.extname(filePath) === `.${ext}`)
      .map((filePath) => getFile(filePath, rootDir))
  )
}

async function getFilePathsRecursive(dir) {
  const dirents = await getDirectory(dir)
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.join(dir, dirent.name)
      return dirent.isDirectory() ? getFilePathsRecursive(res) : res 
    })
  )
  return files.reduce((acc, fileOrDir) => acc.concat(fileOrDir), [])
}

async function getFile(filePath, rootDir) {
  try {
    const name = path.relative(rootDir, filePath)
    const contents = await readFile(filePath, 'utf8')
    return {name, contents}
  } catch(err) {
    throw new Error(`[topo-files]: Error reading file "${filePath}"`)
  }
}

async function getDirectory(dirName) {
  try {
    return readdir(dirName, {withFileTypes: true})
  } catch(err) {
    throw new Error(`[topo-files]: Error reading directory "${dirName}"`)
  }
}

function buildOutput(rawFiles, ext, prefix, keyword) {
  const regex = makeRegexFromKeyword(prefix, keyword)
  const files = rawFiles.map((file) => processFile(file, regex, ext))
  const fileMap = makeFileMap(files)
  assertValidDependencies(fileMap, files)
  const sortedFileNames = sortFileNamesTopologically(files)
  return joinFiles(fileMap, sortedFileNames, prefix)
}

function makeRegexFromKeyword(p = defaultOptions.prefix, k = defaultOptions.keyword) {
  const prefix = makeSafeRegexVariable(p)
  const keyword = makeSafeRegexVariable(k)
  return new RegExp(`^\\s*${prefix}\\s*${keyword} (["'])(.*?)\\1`)
}

function makeSafeRegexVariable(unsafeVar) {
  // https://stackoverflow.com/questions/494035#494122
  return unsafeVar.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}

function processFile({name, contents}, regex, ext) {
  const {deps, content} = separateDependeciesFromContent(contents, regex)
  const relativeDependencies = extractDependencies(deps, name, regex, ext)
  const dependencies = relativeDependencies.map((dep) => resolveDependency(dep, name))
  return {name, relativeDependencies, dependencies, content}
}

function separateDependeciesFromContent(content, regex) {
  const lines = content.split('\n')
  const contentIdx = lines.findIndex((line) => (
    line.trim() && !regex.test(line)
  ))
  return {
    deps: lines.slice(0, contentIdx),
    content: lines.slice(contentIdx).join('\n')
  }
}

function extractDependencies(lines, name, regex, ext) {
  return lines
    .filter((line) => line.trim())
    .map((line) => extractDependecyFromLine(line, regex, ext))
}

function extractDependecyFromLine(line, regex, ext = defaultOptions.ext) {
  const match = line.match(regex)[2]
  const p = path.parse(match)
  return path.join(p.dir, p.name + `.${ext}`)
}

function resolveDependency(target, source) {
  return path.join(path.dirname(source), target)
}

function makeFileMap(files) {
  return files.reduce((acc, {name, content}) => {
    acc[name] = content
    return acc
  }, {})
}

function assertValidDependencies(fileMap, files) {
  files.forEach(({name, dependencies, relativeDependencies}) => {
    dependencies.forEach((dependency, idx) => {
      if (!fileMap[dependency]) {
        const dep = relativeDependencies[idx]
        throw new Error(
          `[topo-files]: ${name}: dependency "${dep}" does not exist`
        )
      }
    })
  })
}

function sortFileNamesTopologically(files) {
  const edges = makeEdgesArray(files)
  return toposort(edges)
}

function makeEdgesArray(files) {
  return files
    .filter((file) => file.dependencies.length)
    .reduce((acc, file) => {
      file.dependencies.forEach((dep) => {
        acc.push([dep, file.name])
      })
      return acc
    }, [])
}

function joinFiles(fileMap, graph, prefix) {
  return graph
    .reduce((acc, name) => {
      const header = makeCommentHeader(name, prefix)
      const content = fileMap[name] 
      acc.push(header, content)
      return acc
    }, [])
    .join('\n\n')
}

function makeCommentHeader(name, prefix = defaultOptions.prefix) {
  const comment = [prefix, name, prefix].join(' ')
  const charRepeat = Math.ceil(comment.length / prefix.length)
  const charLine = prefix.repeat(charRepeat).slice(0, comment.length)
  return [charLine, comment, charLine].join('\n')
}

module.exports = {
  topoFiles,
  getFilesFromDir,
  getFilePathsRecursive,
  getFile,
  getDirectory,
  buildOutput,
  makeRegexFromKeyword,
  processFile,
  separateDependeciesFromContent,
  extractDependencies,
  extractDependecyFromLine,
  resolveDependency,
  makeFileMap,
  assertValidDependencies,
  sortFileNamesTopologically,
  makeEdgesArray,
  joinFiles,
  makeCommentHeader
}
