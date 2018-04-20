const quote = s => /^\w+$/.test(s) ? s : `"${s}"`

module.exports = function stringify (object) {
  let result = ''
  if (Array.isArray(object)) {
    result += '(\n'
    result += object.map(stringify).join(',\n')
    result += '\n)'
  } else if (object.constructor === Object) {
    result += '{\n'
    for (const key in object) {
      result += `${quote(key)} = `
      result += stringify(object[key])
      result += ';\n'
    }
    result += '}'
  } else {
    result += quote(object.toString())
  }
  return result
}
