const test = require('ava')
const path = require('path')
const {topoFiles, DependencyNotFoundError, CyclicDependencyError} = require('../src')

test('topo-files', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/standard')
  const output = await topoFiles(rootDir)
  t.snapshot(output)
})

test('with custom extension', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/customExt')
  const output = await topoFiles(rootDir, {ext: '.sql-module'})
  t.snapshot(output)
})

test('with custom keyword', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/customKeyword')
  const output = await topoFiles(rootDir, {keyword: 'depends-on'})
  t.snapshot(output)
})

test('with custom keyword and extension', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/customKeywordAndExt')
  const output = await topoFiles(rootDir, {
    keyword: 'depends-on',
    ext: '.sql-module'
  })
  t.snapshot(output)
})

test('throw dependency not found error', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/dependencyNotFound')
  await t.throwsAsync(() => topoFiles(rootDir), {
    instanceOf: DependencyNotFoundError,
    message: 'Dependency "something" not found'
  })
})

test('throw circular dependency error', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/circularDependency')
  await t.throwsAsync(() => topoFiles(rootDir), {
    instanceOf: CyclicDependencyError,
    message: 'Cyclic dependency on "baz/qux/qux.sql"'
  })
})
