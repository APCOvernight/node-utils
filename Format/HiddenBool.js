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
  if (value === null || value === undefined) {
    return ''
  }
  if (typeof value !== 'string') {
    return Boolean(value).toString()
  }
  if (value.trim() === 'true' || value.trim() === '1') {
    return 'true'
  }
  if (value.trim() === 'false' || value.trim() === '0') {
    return 'false'
  }
  return ''
}
