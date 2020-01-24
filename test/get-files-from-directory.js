const test = require('ava')
const path = require('path')
const {getFilesFromDirectory} = require('../src/get-files-from-directory')

test('getFilesFromDirectory', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/standard')
  const files = await getFilesFromDirectory(rootDir)
  t.snapshot(files)
})

test('getFilesFromDirectory custom extension', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/customExt')
  const files = await getFilesFromDirectory(rootDir, '.sql-module')
  t.snapshot(files)
})
