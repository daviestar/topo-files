const path = require('path')
const test = require('ava')
const {topoFiles} = require('topo-files')
const {sqlModulesErrorOutput} = require('../src/sql-modules')

test('formats sql modules circular dependency error', async (t) => {
  const dir = path.join(__dirname, 'fixtures/circularDependency')
  try {
    await topoFiles(dir, {joinFiles: false})
  } catch(err) {
    const output = sqlModulesErrorOutput(err)
    t.snapshot(output)
  }
})

test('formats sql modules dependency not found error', async (t) => {
  const dir = path.join(__dirname, 'fixtures/dependencyNotFound')
  try {
    await topoFiles(dir, {joinFiles: false})
  } catch(err) {
    const output = sqlModulesErrorOutput(err)
    t.snapshot(output)
  }
})
