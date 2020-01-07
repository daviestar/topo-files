const test = require('ava')
const {
  makeRegexFromKeyword, extractDependecyFromLine
} = require('../src/process-files')

test('with extension', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine("-- requires foo.sql", regex)
  t.is(str, 'foo.sql')
})

test('without extension', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('-- requires foo', regex)
  t.is(str, 'foo')
})

test('starting with space', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine(' -- requires foo.sql', regex)
  t.is(str, 'foo.sql')
})

test('starting with spaces', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('   -- requires foo.sql', regex)
  t.is(str, 'foo.sql')
})

test('ending with space', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine(' -- requires foo.sql ', regex)
  t.is(str, 'foo.sql')
})

test('ending with spaces', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine(' -- requires foo.sql  ', regex)
  t.is(str, 'foo.sql')
})

test('starting with tab', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('\t-- requires foo.sql', regex)
  t.is(str, 'foo.sql')
})

test('starting with tabs', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('\t\t-- requires foo.sql', regex)
  t.is(str, 'foo.sql')
})

test('no space before requires', (t) => {
  const regex = makeRegexFromKeyword()
  const str = extractDependecyFromLine('--requires foo.sql', regex)
  t.is(str, 'foo.sql')
})

test('with custom keyname', (t) => {
  const regex = makeRegexFromKeyword(undefined, 'depends-on')
  const str = extractDependecyFromLine('-- depends-on foo.sql', regex)
  t.is(str, 'foo.sql')
})
