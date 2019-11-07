const test = require('ava')
const {joinFiles} = require('../topo-files')

test('joinSqlFiles', (t) => {
  const files = {
    'foo.sql': 'CREATE TABLE foo()',
    'bar.sql': 'CREATE TABLE bar()',
    'baz.sql': 'CREATE TABLE baz()',
  }
  const graph = ['baz.sql', 'bar.sql', 'foo.sql']
  const sql = joinFiles(files, graph)
  t.is(sql, [
    '-------------',
    '-- baz.sql --',
    '-------------',
    '',
    'CREATE TABLE baz()',
    '',
    '-------------',
    '-- bar.sql --',
    '-------------',
    '',
    'CREATE TABLE bar()',
    '',
    '-------------',
    '-- foo.sql --',
    '-------------',
    '',
    'CREATE TABLE foo()'
  ].join('\n'))
})
 