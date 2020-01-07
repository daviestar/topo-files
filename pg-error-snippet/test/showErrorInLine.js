const test = require('ava')
const {showErrorInLine} = require('../src/create-code-snippet')

test('throw if errorStyle is not arrow or highlight', async (t) => {
  const error = t.throws(() => {
		showErrorInLine({}, 1, 'something')
  }, Error)
	t.is(
    error.message,
    `[pg-error]: errorStyle must be either 'arrow' or 'highlight'`
  )
})

test('throw if showColors is false and errorStyle is highlight', async (t) => {
  const error = t.throws(() => {
		showErrorInLine({}, 1, 'highlight', false)
  }, Error)
	t.is(
    error.message,
    `[pg-error]: showColors: false is incompatible with errorStyle 'highlight'`
  )
})

test('show arrow error without colour', async (t) => {
  const snippetLine = {
    index: 5,
    content: 'some test string'
  }
  const output = showErrorInLine(snippetLine, 2, undefined, false)
  t.is(output[0].content, 'some test string')
  t.is(output[1].content, '  ^')
})

test('show arrow error with colour', async (t) => {
  const snippetLine = {
    index: 5,
    content: 'some test string'
  }
  const output = showErrorInLine(snippetLine, 2)
  // console.log(output.map(o => o.content).join('\n'))
  t.snapshot(output)
})

test('show arrow error with custom colour', async (t) => {
  const snippetLine = {
    index: 5,
    content: 'some test string'
  }
  const output = showErrorInLine(snippetLine, 2, undefined, undefined, 'green')
  // console.log(output.map(o => o.content).join('\n'))
  t.snapshot(output)
})

test('show highlight error', async (t) => {
  const snippetLine = {
    index: 5,
    content: 'some test string'
  }
  const output = showErrorInLine(snippetLine, 2, 'highlight')
  // console.log(output.map(o => o.content).join('\n'))
  t.snapshot(output)
})

test('show highlight error with custom color', async (t) => {
  const snippetLine = {
    index: 5,
    content: 'some test string'
  }
  const output = showErrorInLine(snippetLine, 2, 'highlight', undefined, 'blue')
  // console.log(output.map(o => o.content).join('\n'))
  t.snapshot(output)
})
