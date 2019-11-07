const test = require('ava')
const {makeFileMap} = require('../topo-files')

test('makeFileMap', (t) => {
  const files = [
    { name: 'foo.sql', content: 'CREATE TABLE foo()' },
    { name: 'bar.sql', content: 'CREATE TABLE bar()' },
    { name: 'baz.sql', content: 'CREATE TABLE baz()' },
  ]
  const fileMap = makeFileMap(files)
  t.deepEqual(fileMap, {
    'foo.sql': 'CREATE TABLE foo()',
    'bar.sql': 'CREATE TABLE bar()',
    'baz.sql': 'CREATE TABLE baz()',
  })
})
