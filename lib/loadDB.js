const bluebird = require('bluebird')
const fsProm = bluebird.promisifyAll(require('fs'))
const pg = require('pg')
const Pool = pg.Pool
const ops = module.exports = {}

// TODO: (V2.0.0) nested json objects should be unpacked into a new table.
// currently I will stringify any nested objects or arrays and drop them as text data types in the default table

const loadRecord = function(pool, record) { // pass pool in here

  // TODO: need to get these vals from the record (object.keys, etc)
  const sqlVals = [record.city, record.state, parseFloat(record.loc[1]), parseFloat(record.loc[0]), parseInt(record.pop), record.zip]
  // TODO: need to make this insert dynamic for the keys in the record
  const sqlString = `INSERT INTO
                     zips(city, state, latitude, longitude, population, zip)
                     VALUES($1, $2, $3, $4, $5, $6);`

  return new Promise((res, rej) => {
    res(pool.query(sqlString, sqlVals))
    .catch(err => rej(err))
  })
}

ops.createPool = function(args) {
  return new Pool({
    user: args.user,
    password: args.dbpassword,
    host: args.hostname,
    database: args.database,
    max: args.maxclients,
    port: args.port,
    idleTimeoutMillis: args.idle
  })
}

ops.createTable = function(args, pool) {
  // NOTE: passed args and pool in here
  // TODO: Need to strip down the create table to json obj
    // NOTE: Filename will be table name
    // TODO: (V2.0.0) Create supplimental tables from nested json objs
  return new Promise((res, rej) => {
    const sqlCreate = `
    CREATE TABLE IF NOT EXISTS zips (
      id SERIAL PRIMARY KEY,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      latitude DECIMAL NOT NULL,
      longitude DECIMAL NOT NULL,
      population INTEGER NOT NULL,
      zip VARCHAR(255) NOT NULL);
      `
    res(
      pool.query(sqlCreate)
      .then(() => console.log('create success'))
      .catch(err => rej(err))
    )
  })
}

ops.readJSON = (file) => {
  return fsProm.readFileAsync(`${__dirname}/../data/${file}`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(fd => fd.map(loadRecord))
  .then(proms => Promise.all(proms))
  .then(() => console.log('files loaded successfully'))
  .catch(err => console.error(err))
}
