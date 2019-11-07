const test = require('ava')
const {makeRegexFromKeyword} = require('../topo-files')

test('default keyword', (t) => {
  const regex = makeRegexFromKeyword()
  t.truthy(regex.test('-- requires "foo"'))
})

test('custom prefix', (t) => {
  const regex = makeRegexFromKeyword('#')
  t.truthy(regex.test('# requires "foo"'))
})

test('custom keyword', (t) => {
  const regex = makeRegexFromKeyword(undefined, 'something')
  t.truthy(regex.test('-- something "foo"'))
})

test('custom prefix and keyword', (t) => {
  const regex = makeRegexFromKeyword('#', 'something')
  t.truthy(regex.test('# something "foo"'))
})

test('unsafe regex string', (t) => {
  const regex = makeRegexFromKeyword('--', '.*')
  t.truthy(regex.test('-- .* "foo"'))
})
