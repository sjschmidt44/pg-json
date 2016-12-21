'use strict'

const pg = require('pg')
const bluebird = require('bluebird')
const parser = require('./arg-parser')
const jdata = require('./read-json')
const args = parser.parseArgs()
const db = module.exports = {}
const Pool = pg.Pool

bluebird.promisifyAll(Pool.prototype);

const pool = new Pool({
  user: args.user,
  password: args.dbpassword,
  host: args.hostname,
  database: args.database,
  max: args.maxclients,
  port: args.port,
  idleTimeoutMillis: args.idle
})


db.createTable = function(data) {
  let singleObj = jdata.types(data[0])
  console.log(singleObj)
  console.log(args)
  let sqlQuery = `CREATE TABLE IF NOT EXISTS ${args.file}(${args.file}_id SERIAL PRIMARY KEY,`

  for (let key in singleObj) {
    sqlQuery += `${key} ${singleObj[key]},`
  }

  console.log(pool.query('CREATE TABLE IF NOT EXISTS HI'))
  pool.query(sqlQuery.replace(/(,)$/, ');')).catch(console.error)
}

db.loadRecord = function(record) {
  let types = jdata.types(record)
  let sqlQuery = `INSERT INTO ${args.file}(`
  let sqlQueryVals = ' VALUES('
  let sqlVals = []

  let counter = 1

  for (let key in types) {
    sqlQuery += `${key},`
    sqlQueryVals += `$${counter++},`
    if (typeof record[key] === 'object') {
      sqlVals.push(JSON.stringify(record[key]))
    } else {
      sqlVals.push(record[key])
    }
  }

  sqlQuery = sqlQuery.replace(/(,)$/, ')')
  sqlQueryVals = sqlQueryVals.replace(/(,)$/, ')')
  sqlQuery += sqlQueryVals

  return new Promise((res, rej) => {
    res(
      pool.query(sqlQuery, sqlVals)
      .catch(err => rej(err))
    )
  })
}
