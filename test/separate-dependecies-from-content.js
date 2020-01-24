const test = require('ava')
const {
  makeRegexFromKeyword, separateDependeciesFromContent
} = require('../src/process-files')

test('with newline between blocks', (t) => {
  const file = `
    -- requires 'bar'
    -- requires 'baz'

    CREATE TABLE foo()
  `
  const regex = makeRegexFromKeyword()
  const separated = separateDependeciesFromContent(file, regex)
  t.snapshot(separated)
})

test('without newline between blocks', (t) => {
  const file = `
    -- requires 'bar'
    -- requires 'baz'
    CREATE TABLE foo()
  `
  const regex = makeRegexFromKeyword()
  const separated = separateDependeciesFromContent(file, regex)
  t.snapshot(separated)
})

test('with newline between requires', (t) => {
  const file = `
    -- requires 'bar'

    -- requires 'baz'

    CREATE TABLE foo()
  `
  const regex = makeRegexFromKeyword()
  const separated = separateDependeciesFromContent(file, regex)
  t.snapshot(separated)
})

