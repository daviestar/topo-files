const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const {defaultOptions} = require('./default-options')
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

async function getFilesFromDirectory(rootDir, ext = defaultOptions.ext) {
  const filePaths = await getFilePathsRecursive(rootDir)
  return Promise.all(
    filePaths
      .filter((filePath) => path.extname(filePath) === ext)
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
    const file = await readFile(filePath, 'utf8')
    return {name, file}
  } catch(err) {
    err.message = `[topo-files]: Error reading file "${filePath}" ${err.message}`
    throw err
  }
}

async function getDirectory(dirName) {
  try {
    return readdir(dirName, {withFileTypes: true})
  } catch(err) {
    err.message = `[topo-files]: Error reading directory "${dirName}" ${err.message}`
    throw err
  }
}

module.exports = {
  getFilesFromDirectory
}
