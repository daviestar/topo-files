const test = require('ava')
const {buildOutput} = require('../topo-files')

test('buildOutput', (t) => {
  const rawFiles = [
    {
      name: 'baz/baz.sql',
      contents: [
        '-- requires "../foo"',
        '-- requires "../bar/bar"',
        'CREATE TABLE baz()'
      ].join('\n'),
    },
    {
      name: 'bar/bar.sql',
      contents: [
        '-- requires "../foo"',
        'CREATE TABLE bar()'
      ].join('\n')
    },
    {
      name: 'foo.sql',
      contents: [
        'CREATE TABLE foo()'
      ].join('\n')
    },
  ]
  const output = buildOutput(rawFiles)
  t.is(output, [
    '-------------',
    '-- foo.sql --',
    '-------------',
    '',
    'CREATE TABLE foo()',
    '',
    '-----------------',
    '-- bar/bar.sql --',
    '-----------------',
    '',
    'CREATE TABLE bar()',
    '',
    '-----------------',
    '-- baz/baz.sql --',
    '-----------------',
    '',
    'CREATE TABLE baz()',
  ].join('\n'))
})
