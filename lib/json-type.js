const bluebird = require('bluebird')
const fsProm = bluebird.promisifyAll(require('fs'))

module.exports = function(file) {
  return fsProm.readFileAsync(`${__dirname}/../data/${file}`)
  .then(jdata => JSON.parse(jdata.toString().trim()))
  .then(data => console.log(data[0]))
  .catch(err => console.error(err))
}
