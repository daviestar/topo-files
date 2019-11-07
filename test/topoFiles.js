const test = require('ava')
const path = require('path')
const {topoFiles} = require('../topo-files')

test('topoFiles', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/standard')
  const output = await topoFiles(rootDir)
  t.is(output, [
    '-------------',
    '-- foo.sql --',
    '-------------',
    '',
    'CREATE TABLE foo()',
    '',
    '',
    '-------------',
    '-- bar.sql --',
    '-------------',
    '',
    'CREATE TABLE bar()',
    '',
    '',
    '-----------------',
    '-- baz/baz.sql --',
    '-----------------',
    '',
    'CREATE TABLE baz()',
    '',
    '',
    '---------------------',
    '-- baz/qux/qux.sql --',
    '---------------------',
    '',
    'CREATE TABLE qux()',
    '',
  ].join('\n'))
})

test('with custom extension', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/customExt')
  const output = await topoFiles(rootDir, {ext: 'sql-module'})
  t.is(output, [
    '--------------------',
    '-- foo.sql-module --',
    '--------------------',
    '',
    'CREATE TABLE foo()',
    '',
    '',
    '--------------------',
    '-- bar.sql-module --',
    '--------------------',
    '',
    'CREATE TABLE bar()',
    '',
    '',
    '------------------------',
    '-- baz/baz.sql-module --',
    '------------------------',
    '',
    'CREATE TABLE baz()',
    '',
    '',
    '----------------------------',
    '-- baz/qux/qux.sql-module --',
    '----------------------------',
    '',
    'CREATE TABLE qux()',
    '',
  ].join('\n'))
})

test('with custom keyword', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/customKeyword')
  const output = await topoFiles(rootDir, {keyword: 'depends-on'})
  t.is(output, [
    '-------------',
    '-- foo.sql --',
    '-------------',
    '',
    'CREATE TABLE foo()',
    '',
    '',
    '-------------',
    '-- bar.sql --',
    '-------------',
    '',
    'CREATE TABLE bar()',
    '',
    '',
    '-----------------',
    '-- baz/baz.sql --',
    '-----------------',
    '',
    'CREATE TABLE baz()',
    '',
    '',
    '---------------------',
    '-- baz/qux/qux.sql --',
    '---------------------',
    '',
    'CREATE TABLE qux()',
    '',
  ].join('\n'))
})

test('with custom keyword and extension', async (t) => {
  const rootDir = path.join(__dirname, 'fixtures/customKeywordAndExt')
  const output = await topoFiles(rootDir, {
    keyword: 'depends-on', 
    ext: 'sql-module'
  })
  t.is(output, [
    '--------------------',
    '-- foo.sql-module --',
    '--------------------',
    '',
    'CREATE TABLE foo()',
    '',
    '',
    '--------------------',
    '-- bar.sql-module --',
    '--------------------',
    '',
    'CREATE TABLE bar()',
    '',
    '',
    '------------------------',
    '-- baz/baz.sql-module --',
    '------------------------',
    '',
    'CREATE TABLE baz()',
    '',
    '',
    '----------------------------',
    '-- baz/qux/qux.sql-module --',
    '----------------------------',
    '',
    'CREATE TABLE qux()',
    '',
  ].join('\n'))
})
