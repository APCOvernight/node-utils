/**
 * Gets an array of strings, and returns an array of numbers. Non numbers are removed.
 * Useful for dealing with form post re-order values.
 *
 * @module Parse/StringArrayToNumberArray
 * @param  {Array} stringArray An array of strings
 * @return {Array}             Array of numbers
 *
 * @example
 * StringArrayToNumberArray(['1', '2', '3'])
 * // returns [1, 2, 3]
 *
 * @example
 * StringArrayToNumberArray()
 * // returns []
 *
 * @example
 * StringArrayToNumberArray(['1', 'A', '3'])
 * // returns [1, 3]
 */
module.exports = function (stringArray) {
  const convertedArray = Array.isArray(stringArray) ? stringArray : [stringArray]
  return convertedArray.map(Number).filter(item => typeof item === 'number' && item)
}
