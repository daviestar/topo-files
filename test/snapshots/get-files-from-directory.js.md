# Snapshot report for `test/get-files-from-directory.js`

The actual snapshot is saved in `get-files-from-directory.js.snap`.

Generated by [AVA](https://ava.li).

## getFilesFromDirectory

> Snapshot 1

    [
      {
        file: `-- requires foo␊
        ␊
        CREATE TABLE bar()␊
        `,
        name: 'bar.sql',
      },
      {
        file: `-- requires ../foo␊
        ␊
        CREATE TABLE baz()␊
        `,
        name: 'baz/baz.sql',
      },
      {
        file: `-- requires ../../foo␊
        -- requires ../baz␊
        ␊
        CREATE TABLE qux()␊
        `,
        name: 'baz/qux/qux.sql',
      },
      {
        file: `CREATE TABLE foo()␊
        `,
        name: 'foo.sql',
      },
    ]

## getFilesFromDirectory custom extension

> Snapshot 1

    [
      {
        file: `-- requires foo␊
        ␊
        CREATE TABLE bar()␊
        `,
        name: 'bar.sql-module',
      },
      {
        file: `-- requires ../foo␊
        ␊
        CREATE TABLE baz()␊
        `,
        name: 'baz/baz.sql-module',
      },
      {
        file: `-- requires ../../foo␊
        -- requires ../baz␊
        ␊
        CREATE TABLE qux()␊
        `,
        name: 'baz/qux/qux.sql-module',
      },
      {
        file: `CREATE TABLE foo()␊
        `,
        name: 'foo.sql-module',
      },
    ]
