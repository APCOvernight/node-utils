'use strict'

/**
 * Parse post request from an HTML input. Useful for true/false radio buttons
 * @module Parse/Bool
 * @param  {(String|Null|Boolean)} [str]  request field
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
module.exports = str => {
  let value = null

  if (str === null || typeof str === 'undefined') {
    value = null
  } else if (typeof str !== 'string') {
    value = Boolean(str)
  } else if (str.trim() === 'true' || str.trim() === '1') {
    value = true
  } else if (str.trim() === 'false' || str.trim() === '0') {
    value = false
  }

  return value
}
