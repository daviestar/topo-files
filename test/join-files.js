const test = require('ava')
const {joinFiles} = require('../src')
const {makeCommentHeader} = require('../src/process-files')

test('joinSqlFiles', (t) => {
  const files = [
    {
      commentHeader: makeCommentHeader('baz.sql'),
      file: 'CREATE TABLE baz();'
    },
    {
      commentHeader: makeCommentHeader('bar.sql'),
      file: 'CREATE TABLE bar();'
    },
    {
      commentHeader: makeCommentHeader('foo.sql'),
      file: 'CREATE TABLE foo();'
    },
  ]
  const output = joinFiles(files)
  t.snapshot(output)
})
