const test = require('ava')
const {addLineNumbers} = require('../src/create-code-snippet')

test('adds number to line without colours', async (t) => {
  const snippet = [
    {
      index: 2,
      content: 'CREATE TABLE foo();'
    }
  ]
  const output = addLineNumbers(snippet, false)
  t.is(output[0], '3 CREATE TABLE foo();')
})

test('adds number to lines without colours', async (t) => {
  const snippet = [
    {
      index: 4,
      content: 'CREATE TABLE foo();'
    },
    {
      index: 5,
      content: 'CREATE TABLE bar();'
    },
    {
      index: 6,
      content: 'CREATE TABLE baz();'
    }
  ]
  const output = addLineNumbers(snippet, false)
  t.deepEqual(output, [
    '5 CREATE TABLE foo();',
    '6 CREATE TABLE bar();',
    '7 CREATE TABLE baz();',
  ])
})

test('adds correct indentation when reaching double figures', async (t) => {
  const snippet = [
    {
      index: 8,
      content: 'CREATE TABLE foo();'
    },
    {
      index: 9,
      content: 'CREATE TABLE bar();'
    },
    {
      index: 10,
      content: 'CREATE TABLE baz();'
    }
  ]
  const output = addLineNumbers(snippet, false)
  t.deepEqual(output, [
    ' 9 CREATE TABLE foo();',
    '10 CREATE TABLE bar();',
    '11 CREATE TABLE baz();',
  ])
})

test('adds correct indentation when reaching triple figures', async (t) => {
  const snippet = [
    {
      index: 98,
      content: 'CREATE TABLE foo();'
    },
    {
      index: 99,
      content: 'CREATE TABLE bar();'
    },
    {
      index: 100,
      content: 'CREATE TABLE baz();'
    }
  ]
  const output = addLineNumbers(snippet, false)
  t.deepEqual(output, [
    ' 99 CREATE TABLE foo();',
    '100 CREATE TABLE bar();',
    '101 CREATE TABLE baz();',
  ])
})

test('adds number to line with default colour', async (t) => {
  const snippet = [
    {
      index: 2,
      content: 'CREATE TABLE foo();'
    }
  ]
  const output = addLineNumbers(snippet)
  t.snapshot(output)
})

test('does not show line numbers', async (t) => {
  const snippet = [
    {
      index: 2,
      content: 'CREATE TABLE foo();'
    }
  ]
  const output = addLineNumbers(snippet, undefined, false)
  t.is(output[0], 'CREATE TABLE foo();')
})

test('adds number to line with custom colour', async (t) => {
  const snippet = [
    {
      index: 2,
      content: 'CREATE TABLE foo();'
    }
  ]
  const output = addLineNumbers(snippet, undefined, undefined, 'yellow')
  t.snapshot(output)
})
