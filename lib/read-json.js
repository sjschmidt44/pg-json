const bluebird = require('bluebird')
const fsProm = bluebird.promisifyAll(require('fs'))
const jsToSql = require('./js-to-sql')

module.exports = function(filename) {
  return fsProm.readFileAsync(`${__dirname}/../data/${filename}.json`)
  .then(getTypes)
}

function getTypes(obj) {
  let data = JSON.parse(obj.toString())[0]
  let newObj = {}
  Object.keys(data).forEach(key => {
    // Need to continue this conversion to return SQL data types
    return newObj[key] = jsToSql(typeof data[key])
  })
  return newObj
}
