const test = require('ava')
const path = require('path')
const {getFilesFromDir} = require('../topo-files')

test('getFilesFromDir', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/standard')
  const files = await getFilesFromDir(rootDir)
  t.deepEqual(files, [
    {
      name: 'bar.sql',
      contents: [
        "-- requires 'foo'",
        "",
        "CREATE TABLE bar()",
        ""
      ].join('\n')
    },
    {
      name: 'baz/baz.sql',
      contents: [
        "-- requires '../foo'",
        "",
        "CREATE TABLE baz()",
        ""
      ].join('\n')
    },
    {
      name: 'baz/qux/qux.sql',
      contents: [
        "-- requires '../../foo'",
        "-- requires '../baz'",
        "",
        "CREATE TABLE qux()",
        ""
      ].join('\n')
    },
    {
      name: 'foo.sql',
      contents: 'CREATE TABLE foo()\n',
    },
  ])
})


test('getFilesFromDir custom extension', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/customExt')
  const files = await getFilesFromDir(rootDir, 'sql-module')
  t.deepEqual(files, [
    {
      name: 'bar.sql-module',
      contents: [
        "-- requires 'foo'",
        "",
        "CREATE TABLE bar()",
        ""
      ].join('\n')
    },
    {
      name: 'baz/baz.sql-module',
      contents: [
        "-- requires '../foo'",
        "",
        "CREATE TABLE baz()",
        ""
      ].join('\n')
    },
    {
      name: 'baz/qux/qux.sql-module',
      contents: [
        "-- requires '../../foo'",
        "-- requires '../baz'",
        "",
        "CREATE TABLE qux()",
        ""
      ].join('\n')
    },
    {
      name: 'foo.sql-module',
      contents: 'CREATE TABLE foo()\n',
    },
  ])
})
