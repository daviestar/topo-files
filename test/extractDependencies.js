const test = require('ava')
const {
  makeRegexFromKeyword, extractDependencies
} = require('../topo-files')

test('extractDependencies', (t) => {
  const lines = [
    '',
    '-- requires "bar"',
    '',
    '-- requires "baz"',
    '-- requires "qux"',
    ''
  ]
  const regex = makeRegexFromKeyword()
  const dependencies = extractDependencies(lines, 'foo.sql', regex)
  t.deepEqual(dependencies, ['bar.sql', 'baz.sql', 'qux.sql'])
})
