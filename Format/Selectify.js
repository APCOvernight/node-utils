'use strict'

/**
 * Convert an object to an array of label and values
 * ready for the APC-brand select mixin
 *
 * @module Format/Selectify
 * @param {Object} object Object of shortnames and longnames
 * @param {Object} [first] The first select option (overrides default)
 * @param {Boolean} [sort] sort by value or label?
 * @return {Array}         label and value objects in an array ready for select mixin
 *
 * @example
 * const definitions = {
 *   pending: 'Awaiting Modification',
 *   rejected: 'Not Approved'
 * }
 *
 * Selectify(definitions, null, true)
 *
 * // returns [{
 * //   value: 'pending',
 * //   label: 'Awaiting Modification'
 * // }, {
 * //   label: 'Not Approved',
 * //   value: 'rejected'
 * // }]
 */
module.exports = (object, first, sort) => {
  const array = [ first || {
    label: ' ',
    value: null
  }]

  Object.keys(object).forEach(key => {
    array.push({
      label: object[key],
      value: key
    })
  })

  if (sort) {
    array.sort((a, b) => a.label > b.label)
  }

  return array
}
