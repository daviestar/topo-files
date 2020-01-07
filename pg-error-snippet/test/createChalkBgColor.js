const test = require('ava')
const {createChalkBgColor} = require('../src/create-code-snippet')

test('converts red to bgRed', async (t) => {
  t.is(createChalkBgColor('red'), 'bgRed')
})

test('converts magentaBright to bgMagentaBright', async (t) => {
  t.is(createChalkBgColor('magentaBright'), 'bgMagentaBright')
})
