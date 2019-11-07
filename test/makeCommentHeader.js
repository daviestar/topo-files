const test = require('ava')
const {makeCommentHeader} = require('../topo-files')

test('makeCommentHeader', (t) => {
  const header = makeCommentHeader('foo')
  console.log(header)
  t.is(header, [
    '---------',
    '-- foo --',
    '---------',
  ].join('\n'))
})
 