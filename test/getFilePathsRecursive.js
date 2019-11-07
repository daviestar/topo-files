const test = require('ava')
const {getFilePathsRecursive} = require('../topo-files')

test('getFilePathsRecursive', async (t) => {
  const filePaths = await getFilePathsRecursive('test/fixtures/standard')
  t.deepEqual(filePaths, [
    'test/fixtures/standard/bar.sql',
    'test/fixtures/standard/baz/baz.sql',
    'test/fixtures/standard/baz/qux/qux.sql',
    'test/fixtures/standard/foo.sql',
    'test/fixtures/standard/something.txt',
  ])
})
