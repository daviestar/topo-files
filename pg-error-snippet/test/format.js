const test = require('ava')
const {format} = require('../src/create-code-snippet')

test('show error on first character of first line without color', async (t) => {
  const snippet = [
    {
      index: 0,
      content: 'CREATE TABLE foo();'
    },
    {
      index: 1,
      content: 'CREATE TABLE bar();'
    },
    {
      index: 2,
      content: 'CREATE TABLE baz();'
    }
  ]
  const output = format(snippet, 0, 0, {showColors: false})
  t.deepEqual(output, [
    '1 CREATE TABLE foo();',
    '  ^',
    '2 CREATE TABLE bar();',
    '3 CREATE TABLE baz();'
  ])
})

test('show error on last character of last line without color', async (t) => {
  const snippet = [
    {
      index: 0,
      content: 'CREATE TABLE foo();'
    },
    {
      index: 1,
      content: 'CREATE TABLE bar();'
    },
    {
      index: 2,
      content: 'CREATE TABLE baz();'
    }
  ]
  const output = format(snippet, 2, 18, {showColors: false})
  t.deepEqual(output, [
    '1 CREATE TABLE foo();',
    '2 CREATE TABLE bar();',
    '3 CREATE TABLE baz();',
    '                    ^',
  ])
})

test('show error on first character of first line with color', async (t) => {
  const snippet = [
    {
      index: 0,
      content: 'CREATE TABLE foo();'
    },
    {
      index: 1,
      content: 'CREATE TABLE bar();'
    },
    {
      index: 2,
      content: 'CREATE TABLE baz();'
    }
  ]
  const output = format(snippet, 0, 0)
  // console.log(output.join('\n'))
  t.snapshot(output)
})

test('show error on last character of last line with color', async (t) => {
  const snippet = [
    {
      index: 0,
      content: 'CREATE TABLE foo();'
    },
    {
      index: 1,
      content: 'CREATE TABLE bar();'
    },
    {
      index: 2,
      content: 'CREATE TABLE baz();'
    }
  ]
  const output = format(snippet, 2, 18)
  // console.log(output.join('\n'))
  t.snapshot(output)
})

test('show error on first character of first line with errorStyle highlight', async (t) => {
  const snippet = [
    {
      index: 0,
      content: 'CREATE TABLE foo();'
    },
    {
      index: 1,
      content: 'CREATE TABLE bar();'
    },
    {
      index: 2,
      content: 'CREATE TABLE baz();'
    }
  ]
  const output = format(snippet, 0, 0, {errorStyle: 'highlight'})
  // console.log(output.join('\n'))
  t.snapshot(output)
})

test('show error on last character of last line with errorStyle highlight', async (t) => {
  const snippet = [
    {
      index: 0,
      content: 'CREATE TABLE foo();'
    },
    {
      index: 1,
      content: 'CREATE TABLE bar();'
    },
    {
      index: 2,
      content: 'CREATE TABLE baz();'
    }
  ]
  const output = format(snippet, 2, 18, {errorStyle: 'highlight'})
  // console.log(output.join('\n'))
  t.snapshot(output)
})
