# Snapshot report for `test/sql-modules-error-output.js`

The actual snapshot is saved in `sql-modules-error-output.js.snap`.

Generated by [AVA](https://ava.li).

## sql modules error output

> Snapshot 1

    `[31m[1m> baz/baz.sql[22m[39m␊
    [31m[1m> [sql-modules]: Cyclic dependency on "baz/qux/qux.sql"[22m[39m␊
    ␊
    [90m1[39m -- requires ../foo␊
    [90m2[39m -- requires qux/qux.sql␊
                  [31m[1m^[22m[39m␊
    `

## throws sql modules circular dependency error

> Snapshot 1

    `[31m[1m> baz/baz.sql[22m[39m␊
    [31m[1m> [sql-modules]: Cyclic dependency on "baz/qux/qux.sql"[22m[39m␊
    ␊
    [90m1[39m -- requires ../foo␊
    [90m2[39m -- requires qux/qux.sql␊
                  [31m[1m^[22m[39m␊
    `

## throws sql modules dependency not found error

> Snapshot 1

    `[31m[1m> baz/qux/qux.sql[22m[39m␊
    [31m[1m> [sql-modules]: Dependency "something" not found[22m[39m␊
    ␊
    [90m1[39m -- requires ../../foo␊
    [90m2[39m -- requires ../baz␊
    [90m3[39m -- requires something␊
                  [31m[1m^[22m[39m␊
    `

## formats sql modules circular dependency error

> Snapshot 1

    `[31m[1m> baz/baz.sql[22m[39m␊
    [31m[1m> [sql-modules]: Cyclic dependency on "baz/qux/qux.sql"[22m[39m␊
    ␊
    [90m1[39m -- requires ../foo␊
    [90m2[39m -- requires qux/qux.sql␊
                  [31m[1m^[22m[39m␊
    `

## formats sql modules dependency not found error

> Snapshot 1

    `[31m[1m> baz/qux/qux.sql[22m[39m␊
    [31m[1m> [sql-modules]: Dependency "something" not found[22m[39m␊
    ␊
    [90m1[39m -- requires ../../foo␊
    [90m2[39m -- requires ../baz␊
    [90m3[39m -- requires something␊
                  [31m[1m^[22m[39m␊
    `