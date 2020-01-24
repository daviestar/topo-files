const test = require('ava')
const {resolveDependency} = require('../src/process-files')

test('flat', (t) => {
  const str = resolveDependency(
    'bar.sql',
    'foo.sql'
  )
  t.is(str, 'bar.sql')
})

test('nested 1', (t) => {
  const str = resolveDependency(
    '../bar.sql',
    'baz/foo.sql'
  )
  t.is(str, 'bar.sql')
})

test('nested 2', (t) => {
  const str = resolveDependency(
    'baz/foo.sql',
    'bar.sql'
  )
  t.is(str, 'baz/foo.sql')
})

test('nested 3', (t) => {
  const str = resolveDependency(
    'baz/foo.sql',
    'qux/bar.sql'
  )
  t.is(str, 'qux/baz/foo.sql')
})

test('nested 4', (t) => {
  const str = resolveDependency(
    'baz/foo.sql',
    'qux/bar.sql'
  )
  t.is(str, 'qux/baz/foo.sql')
})

test('nested 5', (t) => {
  const str = resolveDependency(
    '../foo.sql',
    'foo/bar/baz/qux.sql'
  )
  t.is(str, 'foo/bar/foo.sql')
})

test('nested 6', (t) => {
  const str = resolveDependency(
    '../../foo.sql',
    'foo/bar/baz/qux.sql'
  )
  t.is(str, 'foo/foo.sql')
})

test('with custom file extension', (t) => {
  const str = resolveDependency(
    'bar.sql-module',
    'foo.sql-module',
    '.sql-module'
  )
  t.is(str, 'bar.sql-module')
})
