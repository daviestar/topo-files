const test = require('ava')
const {makeRegexFromKeyword, processFile} = require('../topo-files')

test('processFile', (t) => {
  const name = 'foo/foo.sql'
  const contents = [
    "-- requires 'bar'",
    "",
    "-- requires '../baz'",
    "",
    "CREATE TABLE foo()"
  ].join('\n')
  const regex = makeRegexFromKeyword()
  const processed = processFile({name, contents}, regex)
  t.deepEqual(processed, {
    name: 'foo/foo.sql',
    dependencies: [
      'foo/bar.sql',
      'baz.sql'
    ],
    relativeDependencies: [
      'bar.sql',
      '../baz.sql'
    ],
    content: 'CREATE TABLE foo()'
  })
})

