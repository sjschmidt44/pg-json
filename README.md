# PG-JSON
A command line script to load large sets of JSON data into a postgres database.

## Installation
Install this globally and you'll have access to the `loadjson` command anywhere on your system.
```shell
$ npm install -g pg-json
```
or install it locally in your `node_modules` folder
```shell
$ npm install pg-json
```

## Usage
```shell
$ loadjson [--FLAGS]
```

```
usage: loadjson [-h] [-v] --file ./data/<filename>.json [--database <dbname>]
                [--user <username>] [--dbpassword <dbpassword>]
                [--hostname <hostname>] [--port <port>]
                [--maxclients <maxclients>] [--idle <idletimeout>]


A simple node script which takes a JSON file and populates a record for each
object within a postgres database.

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  --file ./data/<filename>.json, -F ./data/<filename>.json
                        Provide JSON filename, omit extension, to be uploaded
                        to postgres database.
  --database <dbname>, -D <dbname>
                        Provide a database name for the connection pool.
  --user <username>, -U <username>
                        Provide a database user name for the connection pool.
  --dbpassword <dbpassword>, -PW <dbpassword>
                        Provide a database user password for the connection
                        pool.
  --hostname <hostname>, -H <hostname>
                        Provide a host name for the connection pool.
  --port <port>, -P <port>
                        Provide a port number for the connection pool.
  --maxclients <maxclients>, -M <maxclients>
                        Provide the maximum number of client connections for
                        the connection pool.
  --idle <idletimeout>, -I <idletimeout>
                        Provide a maximum idle time for client connections
                        before being closed.

Program exits successfully if database records are created without Error. If
Error is present program exits failure.
```

## Features
* Utilizes the [Node PG Module](https://github.com/brianc/node-postgres) to create table(s) and insert records into a database.
* CLI arguments available to configure the database connection configuration
* Promise-based implementation

The following action will be taken on this file: `root/data/zips.json`
- filename will be used as table name in postgres
- object keys will be used as column names
- column data types will be defined as:
- id/primary key will be defined as `[table_name]_id SERIAL PRIMARY KEY`
- JS `string` === SQL `VARCHAR(256)` OR `TEXT` (size restrictive)
- JS `number` (decimal) === SQL `FLOAT`
- JS `number` === SQL `INTEGER`
- JS `boolean` === SQL `BOOLEAN`
- JS `object` === SQL `TEXT` (JSON stringified content)
- *future release: create separate tables from nested objects*

## Examples
JSON file named `zips.json`
```json
[
  { "city" : "AGAWAM", "loc" : [ -72.622739, 42.070206 ], "pop" : 15338, "state" : "MA", "zip" : "01001" },
  { "city" : "CUSHMAN", "loc" : [ -72.51564999999999, 42.377017 ], "pop" : 36963, "state" : "MA", "zip" : "01002" },
  { "city" : "BARRE", "loc" : [ -72.10835400000001, 42.409698 ], "pop" : 4546, "state" : "MA", "zip" : "01005" }
]
```

`$ loadjson --file zips`

```
$ psql
psql (9.5.4)
Type "help" for help.

user=# SELECT * FROM zips;
zips_id |  city   |          loc           |  pop  | state |  zip
---------+---------+------------------------+-------+-------+-------
      1 | AGAWAM  | [-72.622739,42.070206] | 15338 | MA    | 01001
      2 | CUSHMAN | [-72.51565,42.377017]  | 36963 | MA    | 01002
      3 | BARRE   | [-72.108354,42.409698] |  4546 | MA    | 01005
(3 rows)
```

## LICENSE
[MIT]('./LICENSE')
