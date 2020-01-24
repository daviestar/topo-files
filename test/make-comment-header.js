const test = require('ava')
const {makeCommentHeader} = require('../src/process-files')

test('makeCommentHeader', (t) => {
  const header = makeCommentHeader('foo')
  t.is(header, '-- file: foo\n')
})
