const test = require('ava')
const {makeFileMap, assertValidDependencies} = require('../topo-files')

test('should throw', (t) => {
  const files = [
    {
      name: 'foo.sql', 
      dependencies: [],
      relativeDependencies: [],
      content: 'CREATE TABLE foo()',
    },
    {
      name: 'bar/bar.sql', 
      dependencies: ['something.sql'],
      relativeDependencies: ['../something.sql'],
      content: 'CREATE TABLE bar()',
    },
  ]
  const fileMap = makeFileMap(files)
  const error = t.throws(() => {
		assertValidDependencies(fileMap, files)
  }, Error)
	t.is(
    error.message, 
    '[topo-files]: bar/bar.sql: dependency "../something.sql" does not exist'
  )
})

test('should not throw', (t) => {
  const files = [
    {
      name: 'foo.sql', 
      dependencies: [],
      content: 'CREATE TABLE foo()',
    },
    {
      name: 'bar.sql', 
      dependencies: ['foo.sql'],
      content: 'CREATE TABLE bar()',
    },
    {
      name: 'baz.sql', 
      dependencies: ['foo.sql', 'bar.sql'],
      content: 'CREATE TABLE baz()',
    },
    {
      name: 'qux.sql', 
      dependencies: ['foo.sql', 'bar.sql', 'baz.sql'],
      content: 'CREATE TABLE qux()',
    },
  ]
  const fileMap = makeFileMap(files)
  t.notThrows(() => {
		assertValidDependencies(fileMap, files)
	})
})
