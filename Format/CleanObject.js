'use strict'

/**
 * Remove undefined keys from an object. Useful for preparing
 * sanitized fields before filling a Lucid model
 *
 * @module Format/CleanObject
 * @param  {Object} obj Object to be cleaned
 * @return {Object}     Cleaned object
 *
 * @example
 * CleanObject({
 *   keepThis: 1,
 *   loseThis: undefined
 * })
 * // returns { keepThis: 1 }
 */
module.exports = obj => {
  Object.keys(obj).forEach(key => {
    const isUndef = typeof obj[key] === 'undefined'
    const isReallyNaN = typeof obj[key] === 'number' && isNaN(obj[key])
    if (isUndef || isReallyNaN) {
      delete obj[key]
    }
  })
  return obj
}
