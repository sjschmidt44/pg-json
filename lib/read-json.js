'use strict';

const bluebird = require('bluebird')
const fsProm = bluebird.promisifyAll(require('fs'))
const jsToSql = require('./js-to-sql')
const read = module.exports = {}

read.types = function(obj) {
  let newObj = {}
  Object.keys(obj).forEach(key => {
    return newObj[key] = jsToSql(obj[key])
  })
  return newObj
}

read.allData = function(filename) {
  console.log('hello world', process.env.PWD);
  return fsProm.readFileAsync(`${process.env.PWD}/data/${filename}.json`)
  .then(data => JSON.parse(data.toString().trim()))
}
