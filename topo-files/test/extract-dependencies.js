const test = require('ava')
const {makeRegexFromKeyword, extractDependencies} = require('../src/process-files')

test('extractDependencies', (t) => {
  const lines = `
    -- requires bar

    -- requires baz
    -- requires qux
  `.split('\n')
  const regex = makeRegexFromKeyword()
  const dependencies = extractDependencies(lines, regex)
  t.deepEqual(dependencies, [
    {
      dep: 'bar',
      idx: 1,
    },
    {
      dep: 'baz',
      idx: 3,
    },
    {
      dep: 'qux',
      idx: 4,
    }
  ])
})
