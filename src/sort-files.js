const {DependencyNotFoundError, CyclicDependencyError} = require('./errors')

function sortFiles(files) {
  const filesMap = makeFilesMap(files)
  assertValidDependencies(files, filesMap)
  return topoSort(files, filesMap).map((fileName) => filesMap[fileName])
}

function makeFilesMap(files) {
  return files.reduce((acc, file) => {
    acc[file.name] = file
    return acc
  }, {})
}

function assertValidDependencies(files, filesMap) {
  files.forEach((file) => {
    file.dependencies.forEach((dependency, idx) => {
      if (!filesMap[dependency]) {
        const dep = file.rawDependencies[idx]
        throw new DependencyNotFoundError(dep, file)
      }
    })
  })
}

function topoSort(files, filesMap) {
  const dependentsMap = makeDependentsMap(files)
  const fileNames = files.map((o) => o.name).reverse()
  const visited = {}
  const sorted = []

  function visit(node, ancestors) {
    if (ancestors.has(node)) {
      const parent = Array.from(ancestors).pop()
      throw new CyclicDependencyError(filesMap[parent], node, sorted)
    }
    if (visited[node]) return
    visited[node] = true

    const dependents = dependentsMap[node]
    if (dependents && dependents.length > 0) {
      ancestors.add(node);
      dependents.forEach((child) => {
        visit(child, ancestors)
      })
      ancestors.delete(node)
    }
    sorted.push(node)
  }

  fileNames.forEach((fileName) => {
    visit(fileName, new Set())
  })

  return sorted.reverse()
}

function makeDependentsMap(files) {
  return files
    .filter((file) => file.dependencies.length)
    .reduce((acc, file) => {
      file.dependencies.forEach((dep) => {
        acc.push([dep, file.name])
      })
      return acc
    }, [])
    .reduceRight((acc, [a, b]) => {
      if (!acc[a]) acc[a] = []
      if (!acc[b]) acc[b] = []
      if (acc[a].indexOf(b) < 0) acc[a].push(b)
      return acc
    }, {})
}

module.exports = {
  sortFiles,
  makeFilesMap,
  assertValidDependencies,
}
