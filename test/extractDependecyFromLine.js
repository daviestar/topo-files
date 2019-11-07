const test = require('ava')
const {
  makeRegexFromKeyword, extractDependecyFromLine
} = require('../topo-files')

test.only('single quotes', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine("-- requires 'foo.sql'", regex)
  t.is(str, 'foo.sql')
})

test('double quotes', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('-- requires "foo.sql"', regex)
  t.is(str, 'foo.sql')
})

test('terminated with semi-colon', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('-- requires "foo.sql";', regex)
  t.is(str, 'foo.sql')
})

test('starting with space', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine(' -- requires "foo.sql";', regex)
  t.is(str, 'foo.sql')
})

test('starting with spaces', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('   -- requires "foo.sql";', regex)
  t.is(str, 'foo.sql')
})

test('starting with tab', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('\t-- requires "foo.sql";', regex)
  t.is(str, 'foo.sql')
})

test('starting with tabs', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('\t\t-- requires "foo.sql";', regex)
  t.is(str, 'foo.sql')
})

test('no space before requires', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('--requires "foo.sql";', regex)
  t.is(str, 'foo.sql')
})

test('with custom keyname', (t) => {
  const regex = makeRegexFromKeyword('depends-on')
  const str = extractDependecyFromLine('-- depends-on "foo.sql"', regex)
  t.is(str, 'foo.sql')
})
