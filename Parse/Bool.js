'use strict'

/**
 * Parse post request from an HTML input. Useful for true/false radio buttons
 * @module Parse/Bool
 * @param  {(String|Null|Boolean)} [value]  request field
 * @return {(Boolean|Null)}                 Bool or Null to be saved to model
 *
 * @example
 * ParseBool('1')
 * // returns true
 * @example
 * ParseBool('false')
 * // returns false
 * @example
 * ParseBool('')
 * // returns null
 */
module.exports = value => {
  if (value === null || typeof value === 'undefined') {
    return null
  }
  if (typeof value !== 'string') {
    return Boolean(value)
  }
  if (value.trim() === 'true' || value.trim() === '1') {
    return true
  }
  if (value.trim() === 'false' || value.trim() === '0') {
    return false
  }
  return null
}
