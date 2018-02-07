'use strict'

/**
 * Convert an object to an array of grouped labels and values
 * ready for the APC-brand select mixin
 *
 * @module Format/SelectNestify
 * @param {Array} groups        Array of optgroups objects
 * @param {String} valueKey     key for option value
 * @param {String} labelKey     key for option label
 * @param {String} childrenKey  key for options array
 * @param {Object} [first]      The first select option (overrides default)
 * @return {Array}              Nested label and value objects in an array ready for select mixin
 *
 * @example
 * const array = [
 * {
 *   id: 1,
 *   name: 'rebels',
 *   team: [{
 *       id: 2,
 *       name: 'leia'
 *     }, {
 *       id: 3,
 *       name: 'luke'
 *     }]
 * }, {
 *   id: 4,
 *   name: 'empire',
 *   team: [{
 *       id: 5,
 *       name: 'vader'
 *     }, {
 *       id: 6,
 *       name: 'tarkin'
 *     }]
 * }, {
 *   id: 7,
 *   name: 'gungans'
 * }
 * ]
 *
 * SelectNestify(array, 'id', 'name', 'team', null)
 *
 * // returns [
 * // {
 * //   label: ' ',
 * //   value: null
 * // }, {
 * //   label: 'rebels',
 * //   children: [{
 * //       label: 'leia',
 * //       value: 2
 * //     }, {
 * //       label: 'luke',
 * //       value: 3
 * //     }]
 * // }, {
 * //   label: 'empire',
 * //   children: [{
 * //       label: 'vader',
 * //       value: 5
 * //     }, {
 * //       label: 'tarkin',
 * //       value: 6
 * //     }]
 * // }, {
 * //   label: 'gungans',
 * //   children: []
 * // }
 * // ]
 *
 */
module.exports = (groups, valueKey, labelKey, childrenKey, first) => {
  const array = [ first || {
    label: ' ',
    value: null
  }]

  groups.forEach(group => {
    const children = []
    if (group[childrenKey]) {
      group[childrenKey].forEach(child => {
        children.push({
          label: child[labelKey],
          value: child[valueKey]
        })
      })
    }

    array.push({
      label: group[labelKey],
      children
    })
  })

  return array
}
