const {
  topoFiles,
  joinFiles,
  CyclicDependencyError,
  DependencyNotFoundError
} = require('topo-files')

const {sqlModulesErrorOutput, postgresErrorOutput} = require('./sql-modules')

async function sqlModules(dir, opts = {}) {
  const files = await sortFiles(dir, opts)
  const query = joinFiles(files)
  return {
    files,
    query,
    handleError: (err) => handleError(err, query, files, opts)
  }
}

async function sortFiles(dir, opts = {}) {
  try {
    // need to 'return await' in a try/catch block
    return await topoFiles(dir, {joinFiles: false})
  } catch (err) {
    if (err instanceof DependencyNotFoundError || err instanceof CyclicDependencyError) {
      const output = sqlModulesErrorOutput(err, opts)
      console.error(output)
      process.exit(1)
    } else {
      throw err
    }
  }
}

function handleError(err, query, files, opts) {
  if (err.position !== undefined) {
    const output = postgresErrorOutput(err, query, files, opts)
    console.error(output)
    process.exit(1)
  } else {
    throw err
  }
}

module.exports = {
  sqlModules
}
