class DependencyNotFoundError extends Error {
  constructor({dep, idx}, {name, file}) {
    super(`Dependency "${dep}" not found`)
    this.name = 'DependencyNotFoundError'
    const lines = file.split('\n')
    this.fileName = name
    this.line = idx
    this.position = lines[idx].indexOf(dep)
    this.file = file
    Error.captureStackTrace(this, DependencyNotFoundError)
  }
}

class CyclicDependencyError extends Error {
  constructor({name, dependencies, rawDependencies, file}, dependency) {
    super(`Cyclic dependency on "${dependency}"`)
    this.name = 'CyclicDependencyError'
    const index = dependencies.indexOf(dependency)
    const lines = file.split('\n')
    const {dep, idx} = rawDependencies[index]
    this.fileName = name
    this.line = idx
    this.position = lines[idx].indexOf(dep)
    this.file = file
    Error.captureStackTrace(this, CyclicDependencyError)
  }
}

module.exports = {
  DependencyNotFoundError,
  CyclicDependencyError,
}
