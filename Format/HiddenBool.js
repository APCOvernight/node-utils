'use strict'

/**
 * Set boolean(ish) string value to 'true', 'false' or ''.
 * Used for populating hidden form inputs in views
 *
 * @module Format/HiddenBool
 * @param  {(String|Null|Boolean)} value model value
 * @return {String}                      'true', 'false' or '' to be posted with form
 *
 * @example
 * HiddenBool(1)
 * // returns 'true'
 * @example
 * HiddenBool('false')
 * // returns 'false'
 * @example
 * HiddenBool()
 * // returns ''
 */
module.exports = value => {
  let str = ''

  if (value === null || value === undefined) {
    str = ''
  } else if (typeof value !== 'string') {
    str = Boolean(value).toString()
  } else if (value.trim() === 'true' || value.trim() === '1') {
    str = 'true'
  } else if (value.trim() === 'false' || value.trim() === '0') {
    str = 'false'
  }

  return str
}
