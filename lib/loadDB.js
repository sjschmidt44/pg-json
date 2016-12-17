const pg = require('pg')
const parser = require('./arg-parser')
const jdata = require('./read-json')
const args = parser.parseArgs()
const db = module.exports = {}
const Pool = pg.Pool

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
  let sqlQuery = `CREATE TABLE IF NOT EXISTS ${args.file}(${args.file}_id SERIAL PRIMARY KEY,`

  for (let key in singleObj) {
    sqlQuery += `${key} ${singleObj[key]},`
  }

  return new Promise((res, rej) => {
    res(
      pool.query(sqlQuery.replace(/(,)$/, ');'))
      .then(() => data)
      .catch(err => rej(err))
    )
  })
}

db.loadRecord = function(record) {
  // let sqlQuery = `INSERT INTO ${args.file}(${args.file_id}, ) VALUES()`
  return record
}
