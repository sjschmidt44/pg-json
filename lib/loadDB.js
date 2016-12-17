const pg = require('pg')
const parser = require('../lib/arg-parser')
const Pool = pg.Pool
const db = module.exports = {}
// const bluebird = require('bluebird')
// const fsProm = bluebird.promisifyAll(require('fs'))
//
// console.log(parser.parseArgs()) // use args to set up pool

const args = parser.parseArgs()

const pool = new Pool({
  user: args.user,
  password: args.dbpassword,
  host: args.hostname,
  database: args.database,
  max: args.maxclients,
  port: args.port,
  idleTimeoutMillis: args.idle
})

db.createTable = function(types) {
  let sqlCreate = `
  CREATE TABLE IF NOT EXISTS ${args.file} (${args.file}_id SERIAL PRIMARY KEY,` // need to complete a function that will concat this sql with the new key/val and datatypes

  for (let key in types) {
    sqlCreate += `${key} ${types[key]},`
  }

  return new Promise((res, rej) => {
    res(
      pool.query(sqlCreate.replace(/(,)$/, ');'))
      .then(() => console.log('create success'))
      .catch(err => rej(err))
    )
  })
}
