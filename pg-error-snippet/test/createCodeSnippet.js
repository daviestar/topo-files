const test = require('ava')
const {Pool} = require('pg')
const {getIndexFromErrorPosition} = require('../src')
const {createCodeSnippet} = require('../src/create-code-snippet')

const pool = new Pool({ connectionString: 'pg-error-snippet' })

test('find comma bug', async (t) => {
  const query = `
    CREATE TABLE foo(
      col1 INTEGER,
      col2 INTEGER,
      col3 INTEGER
      col4 INTEGER,
      col5 INTEGER,
      col6 INTEGER,
      col7 INTEGER,
      col8 INTEGER,
      col9 INTEGER
    );
  `
  try {
    await pool.query(query)
  } catch(err) {
    const index = getIndexFromErrorPosition(err.position, query)
    const snippet = createCodeSnippet(index, query, {errorStyle: 'highlight'})
    // console.log(snippet + '\n')
    t.snapshot(snippet)
  }
})

test('find typo bug', async (t) => {
  const query = `
    CRATE TABLE foo(
      col1 INTEGER,
      col2 INTEGER,
      col3 INTEGER,
      col4 INTEGER,
      col5 INTEGER,
      col6 INTEGER,
      col7 INTEGER,
      col8 INTEGER,
      col9 INTEGER
    );
  `
  try {
    await pool.query(query)
  } catch(err) {
    const index = getIndexFromErrorPosition(err.position, query)
    const snippet = createCodeSnippet(index, query)
    // console.log(snippet)
    t.snapshot(snippet)
  }
})

test('find parenthesis bug', async (t) => {
  const query = `
    CREATE TABLE foo)
      col1 INTEGER,
      col2 INTEGER,
      col3 INTEGER,
      col4 INTEGER,
      col5 INTEGER,
      col6 INTEGER,
      col7 INTEGER,
      col8 INTEGER,
      col9 INTEGER
    );
  `
  try {
    await pool.query(query)
  } catch(err) {
    const index = getIndexFromErrorPosition(err.position, query)
    const snippet = createCodeSnippet(index, query, {linesBefore: 2, linesAfter: 2})
    // console.log(snippet)
    t.snapshot(snippet)
  }
})

test('find typo bug 2', async (t) => {
  const query = `
    CREATE TABLE foo(
      col1 INTEGER,
      col2 INTEGER,
      col3 INTEGER,
      col4 INTGER,
      col5 INTEGER,
      col6 INTEGER,
      col7 INTEGER,
      col8 INTEGER,
      col9 INTEGER
    );
  `
  try {
    await pool.query(query)
  } catch(err) {
    const index = getIndexFromErrorPosition(err.position, query)
    const snippet = createCodeSnippet(index, query)
    // console.log(snippet)
    t.snapshot(snippet)
  }
})
