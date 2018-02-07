'use strict'

/**
 * Format Adonis Validator error messages in a format that
 * works with APC input mixins
 *
 * @module Format/Errors
 * @param  {Array} errors Array of objects with errors
 * @return {Object}       Object with keys for field names
 *
 * @example
 * FormatErrors([{ field: 'name', message: 'Name is required' }])
 *
 * // returns { name: 'Name is required' }
 */
module.exports = errors => {
  const object = {}

  errors.map(error => {
    if (object[error.field]) {
      object[error.field] += `. ${error.message}`
    } else {
      object[error.field] = error.message
    }
  })

  return object
}
