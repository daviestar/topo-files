const test = require('ava')
const {getErrorCoords} = require('../src/create-code-snippet')

test('get coordinates at first character', async (t) => {
  const string = [
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
  ].join('\n')
  const output = getErrorCoords(string, 0)
  t.is(output.y, 0)
  t.is(output.x, 0)
})

test('get coordinates at 99th character', async (t) => {
  const string = [
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
  ].join('\n')
  const output = getErrorCoords(string, 99)
  t.is(output.y, 9)
  t.is(output.x, 9)
})

test('get coordinates at 50th character', async (t) => {
  const string = [
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
    '012345678',
  ].join('\n')
  const output = getErrorCoords(string, 50)
  t.is(output.y, 5)
  t.is(output.x, 0)
})

test('get coordinates at 50th character with \\r\\n eols', async (t) => {
  const string = [
    '01234567',
    '01234567',
    '01234567',
    '01234567',
    '01234567',
    '01234567',
    '01234567',
    '01234567',
    '01234567',
    '01234567',
  ].join('\r\n')
  const output = getErrorCoords(string, 50, '\r\n')
  t.is(output.y, 5)
  t.is(output.x, 0)
})
