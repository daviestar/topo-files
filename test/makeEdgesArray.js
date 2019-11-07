const test = require('ava')
const {makeEdgesArray} = require('../topo-files')

test('makeEdgesArray', (t) => {
  const files = [
    {name: 'foo.sql', dependencies: []},
    {name: 'bar.sql', dependencies: ['foo.sql']},
    {name: 'baz.sql', dependencies: ['foo.sql', 'bar.sql']},
    {name: 'qux.sql', dependencies: ['foo.sql', 'bar.sql', 'baz.sql']},
  ]
  const edges = makeEdgesArray(files)
  t.deepEqual(edges, [
    ['foo.sql', 'bar.sql'],
    ['foo.sql', 'baz.sql'],
    ['bar.sql', 'baz.sql'],
    ['foo.sql', 'qux.sql'],
    ['bar.sql', 'qux.sql'],
    ['baz.sql', 'qux.sql'],
  ])
})
 
