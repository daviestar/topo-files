const test = require('ava')
const {makeRegexFromKeyword} = require('../src/process-files')

test('default keyword', (t) => {
  const regex = makeRegexFromKeyword()
  const match = '-- requires foo '.match(regex)
  t.is(match[1], 'foo')
})

test('custom comment', (t) => {
  const regex = makeRegexFromKeyword('#')
  const match = '# requires foo'.match(regex)
  t.is(match[1], 'foo')
})

test('custom keyword', (t) => {
  const regex = makeRegexFromKeyword(undefined, 'something')
  const match = '-- something foo '.match(regex)
  t.is(match[1], 'foo')
})

test('custom comment and keyword', (t) => {
  const regex = makeRegexFromKeyword('#', 'something')
  const match = '# something foo'.match(regex)
  t.is(match[1], 'foo')
})

test('unsafe regex string', (t) => {
  const regex = makeRegexFromKeyword('--', '.*')
  const match = '-- .* foo '.match(regex)
  t.is(match[1], 'foo')
})
