'use strict'

const Moment = require('moment')

/**
 * Remove regex matches from a string
 *
 * @module Format/Sanitize.regexReplace
 * @param  {String} value unsanitized input
 * @param  {Regex}  regex Regex pattern to match
 * @return {String}       sanitized output
 */
const regexReplace = (value, regex) => {
  if ((value !== null) && (value !== undefined)) {
    value = value.replace(regex, '')
  }
  return value === '' ? null : value
}

/**
 * Convert date submitted by datepicker to mysql format.
 * If can't be parsed as date, return as is to let Validator
 * fail it
 *
 * @module Format/Sanitize.optionalDate
 * @requires moment
 * @param  {String} date   Human Friendly Date
 * @param  {String} formatString Format String
 * @return {(String|Null)} YYYY-MM-DD
 *
 * @example
 * Sanitize.optionalDate('24th November 2016')
 *
 * // returns '2016-11-24'
 * @example
 * Sanitize.optionalDate('')
 *
 * // returns null
 */
const optionalDate = function (date, formatString) {
  if (date && Moment(date, formatString).isValid()) {
    date = Moment(date, formatString).format('YYYY-MM-DD')
  }
  return date === '' ? null : date
}

/**
 * alphaNumeric sanitization - strip out any characters that are not Alpha Numeric
 *
 * @module Format/Sanitize.alphaNumeric
 * @param  {String} value unsanitized input
 * @return {String}       sanitized output
 */
const alphaNumeric = value => regexReplace(value, /[^a-zA-Z\d\s]+/g)

/**
 * Alpha sanitization - strip out characters that are not Alpha.
 *
 * @module Format/Sanitize.alpha
 * @param  {String} value unsanitized input
 * @return {String}       sanitized output
 */
const alpha = value => regexReplace(value, /[^a-zA-Z\s]+/g)

/**
 * Numeric sanitization - strips out any characters that are not Numeric
 *
 * @module Format/Sanitize.numeric
 * @param  {String} value unsanitized input
 * @return {String}       sanitized output
 */
const numeric = value => regexReplace(value, /[^\d\s]+/g)

/**
 * Sanitizes social media usernames (stripping + and @ from start)
 *
 * @module Format/Sanitize.username
 * @param  {String} value unsanitized input
 * @return {String}       sanitized output
 */
const username = value => regexReplace(value, /^[@+]/)

/**
 * Add http:// to a url if no protocol specified
 * @module Format/Sanitize.urlProtocol
 * @param  {String} url Partial or complete URL
 * @return {String}     Complete URL
 *
 * @example
 * Url('google.com')
 * // returns 'http://google.com'
 * @example
 * Url('https://facebook.com')
 * // returns 'https://facebook.com'
 */
const urlProtocol = url => {
  if (url && !/^(?:f|ht)tps?:\/\//.test(url)) {
    url = `http://${url}`
  }
  return url
}

module.exports = { regexReplace, numeric, alpha, alphaNumeric, optionalDate, username, urlProtocol }
