const test = require('ava')
const {processFiles} = require('../src/process-files')

test('process files', (t) => {
  const files = [
    {
      name: 'foo/foo.sql',
      file: `
        -- requires bar

        -- requires ../baz

        CREATE TABLE foo()
      `
    }
  ]
  const processed = processFiles(files)
  t.snapshot(processed)
})

