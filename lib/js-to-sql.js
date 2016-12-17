module.exports = function(data) {
  if (data === 'string') {
    return data.length > 256 ? 'TEXT' : 'VARCHAR(256)'
  }
  if (data === 'number') {
    return data % 1 === 0 ? 'INTEGER' : 'FLOAT'
  }
  if (data === 'object') return 'TEXT'
  return 'TEXT'
}
