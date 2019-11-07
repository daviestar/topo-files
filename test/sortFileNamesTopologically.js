const test = require('ava')
const {sortFileNamesTopologically} = require('../topo-files')

test('sortFileNamesTopologically', (t) => {
  const files = [
    {name: 'bar.sql', dependencies: ['foo.sql']},
    {name: 'qux.sql', dependencies: ['foo.sql', 'bar.sql', 'baz.sql']},
    {name: 'foo.sql', dependencies: []},
    {name: 'baz.sql', dependencies: ['foo.sql', 'bar.sql']},
  ]
  const graph = sortFileNamesTopologically(files)
  t.deepEqual(graph, ['foo.sql', 'bar.sql', 'baz.sql', 'qux.sql'])
})
 
test('should throw on circular dependecy', (t) => {
  const files = [
    {name: 'foo.sql', dependencies: ['bar.sql']},
    {name: 'bar.sql', dependencies: ['foo.sql']},
  ]
  const error = t.throws(() => {
		sortFileNamesTopologically(files)
	}, Error)
	t.is(error.message, 'Cyclic dependency, node was:"foo.sql"');
})
 