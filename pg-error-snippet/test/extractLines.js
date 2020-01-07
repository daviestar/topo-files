const test = require('ava')
const {extractLines} = require('../src/create-code-snippet')

test('extracts only error line when no lines above', async (t) => {
  const lines = [
    'CREATE TABLE foo(',
    '  col1 INTEGER,',
    '  col2 INTEGER,',
    '  col3 INTEGER,',
    '  col4 INTEGER,',
    '  col5 INTEGER,',
    '  col6 INTEGER,',
    '  col7 INTEGER,',
    '  col8 INTEGER,',
    '  col9 INTEGER',
    ');'
  ]
  const output = extractLines(lines, 0, 10, 0)
  t.deepEqual(output, [
    { index: 0, content: 'CREATE TABLE foo(' }
  ])
})

test('extracts only one line above error line when no other lines', async (t) => {
  const lines = [
    'CREATE TABLE foo(',
    '  col1 INTEGER,',
    '  col2 INTEGER,',
    '  col3 INTEGER,',
    '  col4 INTEGER,',
    '  col5 INTEGER,',
    '  col6 INTEGER,',
    '  col7 INTEGER,',
    '  col8 INTEGER,',
    '  col9 INTEGER',
    ');'
  ]
  const output = extractLines(lines, 1, 10, 0)
  t.deepEqual(output, [
    { index: 0, content: 'CREATE TABLE foo(' },
    { index: 1, content: '  col1 INTEGER,' }
  ])
})

test('extracts only error line when no lines below', async (t) => {
  const lines = [
    'CREATE TABLE foo(',
    '  col1 INTEGER,',
    '  col2 INTEGER,',
    '  col3 INTEGER,',
    '  col4 INTEGER,',
    '  col5 INTEGER,',
    '  col6 INTEGER,',
    '  col7 INTEGER,',
    '  col8 INTEGER,',
    '  col9 INTEGER',
    ');'
  ]
  const output = extractLines(lines, 10, 0, 10)
  t.deepEqual(output, [
    { index: 10, content: ');' }
  ])
})

test('extracts only one line below error line when no other lines', async (t) => {
  const lines = [
    'CREATE TABLE foo(',
    '  col1 INTEGER,',
    '  col2 INTEGER,',
    '  col3 INTEGER,',
    '  col4 INTEGER,',
    '  col5 INTEGER,',
    '  col6 INTEGER,',
    '  col7 INTEGER,',
    '  col8 INTEGER,',
    '  col9 INTEGER',
    ');'
  ]
  const output = extractLines(lines, 9, 0, 10)
  t.deepEqual(output, [
    { index: 9, content: '  col9 INTEGER' },
    { index: 10, content: ');' }
  ])
})

test('extracts 2 lines above and 3 below', async (t) => {
  const lines = [
    'CREATE TABLE foo(',
    '  col1 INTEGER,',
    '  col2 INTEGER,',
    '  col3 INTEGER,',
    '  col4 INTEGER,',
    '  col5 INTEGER,',
    '  col6 INTEGER,',
    '  col7 INTEGER,',
    '  col8 INTEGER,',
    '  col9 INTEGER',
    ');'
  ]
  const output = extractLines(lines, 5, 2, 3)
  t.deepEqual(output, [
    { index: 3, content: '  col3 INTEGER,' },
    { index: 4, content: '  col4 INTEGER,' },
    { index: 5, content: '  col5 INTEGER,' },
    { index: 6, content: '  col6 INTEGER,' },
    { index: 7, content: '  col7 INTEGER,' },
    { index: 8, content: '  col8 INTEGER,' }
  ])
})
