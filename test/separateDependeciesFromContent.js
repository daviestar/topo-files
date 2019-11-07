const test = require('ava')
const {
  makeRegexFromKeyword, separateDependeciesFromContent
} = require('../topo-files')

test('with newline between blocks', (t) => {
  const content = [
    "-- requires 'bar'",
    "-- requires 'baz'",
    "",
    "CREATE TABLE foo()"
  ].join('\n')
  const regex = makeRegexFromKeyword()
  const separated = separateDependeciesFromContent(content, regex)
  t.deepEqual(separated, {
    deps: [
      "-- requires 'bar'",
      "-- requires 'baz'",
      ""
    ],
    content: 'CREATE TABLE foo()'
  })
})

test('without newline between blocks', (t) => {
  const content = [
    "-- requires 'bar'",
    "-- requires 'baz'",
    "CREATE TABLE foo()"
  ].join('\n')
  const regex = makeRegexFromKeyword()
  const separated = separateDependeciesFromContent(content, regex)
  t.deepEqual(separated, {
    deps: [
      "-- requires 'bar'",
      "-- requires 'baz'",
    ],
    content: 'CREATE TABLE foo()'
  })
})

test('with newline between requires', (t) => {
  const content = [
    "-- requires 'bar'",
    "",
    "-- requires 'baz'",
    "",
    "CREATE TABLE foo()"
  ].join('\n')
  const regex = makeRegexFromKeyword()
  const separated = separateDependeciesFromContent(content, regex)
  t.deepEqual(separated, {
    deps: [
      "-- requires 'bar'",
      "",
      "-- requires 'baz'",
      "",
    ],
    content: 'CREATE TABLE foo()'
  })
})

