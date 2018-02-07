'use strict'

/**
 * Create subheader string showing total records and
 * active filters, to be appended to page header of
 * search results.
 *
 * @module Format/TitleFilters
 * @param  {Integer} total    Total records
 * @param  {Object} [filters] Filters and their selected options
 * @return {String}           Subheader string
 *
 * @example
 * TitleFilters(50)
 * // returns ' (50)'
 *
 * @example
 * TitleFilters(50, {status: 'published'})
 * // returns ' - published (50)'
 *
 * @example
 * TitleFilters(50, {status: 'published', depot: 'EDS Couriers'})
 * // returns ' - published & EDS Couriers (50)'
 */
module.exports = (total, filters) => {
  let title = ''
  let first = true
  if (filters) {
    Object.keys(filters).forEach(filter => {
      if (filters[filter]) {
        if (first) {
          title += ' -'
        } else {
          title += ' &'
        }
        title += ` ${filters[filter]}`
        first = false
      }
    })
  }

  title += ` (${total})`

  return title
}
