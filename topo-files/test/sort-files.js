const test = require('ava')
const {sortFiles} = require('../src/sort-files')

test('sort files', (t) => {
  const files = [
    {name: 'bar.sql', dependencies: ['foo.sql']},
    {name: 'qux.sql', dependencies: ['foo.sql', 'bar.sql', 'baz.sql']},
    {name: 'foo.sql', dependencies: []},
    {name: 'baz.sql', dependencies: ['foo.sql', 'bar.sql']},
  ]
  const result = sortFiles(files)
  t.deepEqual(
    result.map((o) => o.name),
    ['foo.sql', 'bar.sql', 'baz.sql', 'qux.sql']
  )
})

test("sort files 2", (t) => {
  const files = [
    {name: '1', dependencies: ['2']},
    {name: '2', dependencies: ['3', '5']},
    {name: '3', dependencies: []},
    {name: '4', dependencies: ['5']},
    {name: '5', dependencies: ['6']},
    {name: '6', dependencies: []},
  ]
  const result = sortFiles(files)
  t.deepEqual(result.map((o) => o.name), ['3', '6', '5', '2', '1', '4'])
})

test("triangular dependency", (t) => {
  const files = [
    {name: 'a', dependencies: []},
    {name: 'b', dependencies: ['a']},
    {name: 'c', dependencies: ['a', 'b']},
  ]
  const result = sortFiles(files)
  t.deepEqual(result.map((o) => o.name), ['a', 'b', 'c']);
})

test('should include unconnected nodes', (t) => {
  const files = [
    {name: 'd', dependencies: []},
    {name: 'c', dependencies: ['b']},
    {name: 'a', dependencies: []},
    {name: 'b', dependencies: ['a']},
  ]
  const result = sortFiles(files)
  t.deepEqual(result.map((o) => o.name), ['d', 'a', 'b', 'c'])
})

test('should not mutate its arguments', (t) => {
  const files = [
    {name: 'd', dependencies: []},
    {name: 'c', dependencies: ['b']},
    {name: 'a', dependencies: []},
    {name: 'b', dependencies: ['a']},
  ]
  sortFiles(files)
  t.deepEqual(files.map((o) => o.name), ['d', 'c', 'a', 'b'])
})
