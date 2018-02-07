'use strict'

const BuildUrl = require('build-url')

/**
 * Format an absolute url from within a view
 *
 * @module Format/BuildUrl
 * @param {String} baseUrl     App base url (Protocol + Domain name)
 * @param {String} path        Url path
 * @param {Object} [queryParams] Key/Value pairs of query paramters
 * @param {String} [hash]        Url hash
 * @return {String}            Absolute Url
 *
 * @requires build-url
 *
 * @example
 * const params = {
 *   depotId: 21,
 *   sort: asc
 * }
 *
 * const path = '/admin/'
 *
 * const hash = anchor_34
 *
 * BuildUrl(path, params, hash)
 *
 * // returns 'http://mybase.com/admin?depotId=21&sort=asc#anchor_34'
 */
module.exports = (baseUrl, path, queryParams, hash) => {
  // Remove null or undefined paramters
  if (queryParams) {
    Object.keys(queryParams).forEach(key => (queryParams[key] == null || queryParams[key] === '') && delete queryParams[key])
    if (!Object.keys(queryParams).length) {
      queryParams = null
    }
  }
  return BuildUrl(baseUrl.replace(/\/+$/, ''), {
    path,
    queryParams,
    hash
  })
}
