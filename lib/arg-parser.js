const ArgParser = require('argparse').ArgumentParser

const parser = module.exports = new ArgParser({
  version: '1.0.0',
  addHelp: true,
  description: 'A simple node script which takes a JSON file and populates a record for each object within a postgres database.',
  epilog: 'Program exits successfully if database records are created without Error.\nIf Error is present program exits failure.'
})

parser.addArgument(
  ['--file', '-F'],
  {
    help: 'Provide JSON filename, omit extension, to be uploaded to postgres database.',
    required: true,
    metavar: './data/<filename>.json'
  })

parser.addArgument(
  ['--database', '-D'],
  {
    help: 'Provide a database name for the connection pool.',
    defaultValue: '',
    metavar: '<dbname>'
  }
)

parser.addArgument(
  ['--user', '-U'],
  {
    help: 'Provide a database user name for the connection pool.',
    defaultValue: '',
    metavar: '<username>'
  }
)

parser.addArgument(
  ['--dbpassword', '-PW'],
  {
    help: 'Provide a database user password for the connection pool.',
    defaultValue: '',
    metavar: '<dbpassword>'
  }
)

parser.addArgument(
  ['--hostname', '-H'],
  {
    help: 'Provide a host name for the connection pool.',
    defaultValue: 'localhost',
    metavar: '<hostname>'
  }
)

parser.addArgument(
  ['--port', '-P'],
  {
    help: 'Provide a port number for the connection pool.',
    defaultValue: 5432,
    metavar: '<port>'
  }
)

parser.addArgument(
  ['--maxclients', '-M'],
  {
    help: 'Provide the maximum number of client connections for the connection pool.',
    defaultValue: 10,
    metavar: '<maxclients>'
  }
)

parser.addArgument(
  ['--idle', '-I'],
  {
    help: 'Provide a maximum idle time for client connections before being closed.',
    defaultValue: 5000,
    metavar: '<idletimeout>'
  }
)
