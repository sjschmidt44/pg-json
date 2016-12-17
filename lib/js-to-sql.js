module.exports = function(data) {
  // TODO: expand this to account for other data types, as well as nested objects
  if (data === 'string') return data.length > 256 ? 'TEXT' : 'VARCHAR(256)'
  if (data === 'number') return data % 1 === 0 ? 'INTEGER' : 'FLOAT'
  if (data === 'object') return 'TEXT'
  return 'TEXT'
}
