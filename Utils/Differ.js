'use strict'

/**
 * Compare keys and values of 2 single dimension objects
 * @class Utils/Differ
 */
class Differ {
  /**
   * @memberof Utils/Differ
   * @param  {Object} lhs 1st object to compare
   * @param  {Object} rhs Object to compare against lhs
   */
  constructor (lhs, rhs) {
    this.lhs = lhs
    this.rhs = rhs
  }

  /**
   * Object with fields that have changed
   * @memberof Utils/Differ
   * @return {Object}
   *
   * @example
   * new Differ(lObject, rObject).diff
   * // returns {
   * //   someProperty: 'newValue'
   * // }
   */
  get diff () {
    const diff = {}
    const keys = Object.keys(this.rhs).concat(Object.keys(this.lhs))

    keys.forEach(key => {
      if (!this._compare(this.lhs[key], this.rhs[key])) {
        // Exclude undefineds, and objects
        if (typeof this.rhs[key] !== 'undefined' && !(this.rhs[key] !== null && typeof this.rhs[key] === 'object')) {
          diff[key] = this.rhs[key]
        }
      }
    })

    return diff
  }

  /**
   * Compare 2 values
   * @memberof Utils/Differ
   * @private
   * @param  {Mixed} l left value
   * @param  {Mixed} r right value
   * @return {Boolean} Do they match?
   */
  _compare (l, r) {
    return this._compareStrict(l, r) ||
      this._compareTruthy(l, r) ||
      this._compareFalsey(l, r) ||
      this._compareNull(l, r) ||
      this._compareIntegers(l, r) ||
      this._compareStrings(l, r)
  }

  /**
   * Compare strict types
   * @memberof Utils/Differ
   * @private
   * @param  {Mixed} l left value
   * @param  {Mixed} r right value
   * @return {Boolean} Do they match?
   */
  _compareStrict (l, r) {
    return l === r
  }

  /**
   * Compare truthy (1 == true)
   * @memberof Utils/Differ
   * @private
   * @param  {Mixed} l left value
   * @param  {Mixed} r right value
   * @return {Boolean} Do they match?
   */
  _compareTruthy (l, r) {
    return this._compareBoolean(true, l, r)
  }

  /**
   * Compare falsey (0 == false)
   * @memberof Utils/Differ
   * @private
   * @param  {Mixed} l left value
   * @param  {Mixed} r right value
   * @return {Boolean} Do they match?
   */
  _compareFalsey (l, r) {
    return this._compareBoolean(false, l, r)
  }

  /**
   * Compare truthy (1 == true)
   * @memberof Utils/Differ
   * @private
   * @param  {Boolean} bool Truthy or Falsey
   * @param  {Mixed} l left value
   * @param  {Mixed} r right value
   * @return {Boolean} Do they match?
   */
  _compareBoolean (bool, l, r) {
    return (l === bool || l === +bool) && (r === bool || r === +bool)
  }

  /**
   * Compare strings ('\r\n' == '\n')
   * @memberof Utils/Differ
   * @private
   * @param  {Mixed} l left value
   * @param  {Mixed} r right value
   * @return {Boolean} Do they match?
   */
  _compareStrings (l, r) {
    if (typeof l !== 'string' || typeof r !== 'string') {
      return false
    }

    return l.replace(/\r/g, '') === r.replace(/\r/g, '')
  }

  /**
   * Compare integers (1 == '1')
   * @memberof Utils/Differ
   * @private
   * @param  {Mixed} l left value
   * @param  {Mixed} r right value
   * @return {Boolean} Do they match?
   */
  _compareIntegers (l, r) {
    if (typeof l === 'number' && typeof r === 'string') {
      return l === parseInt(r)
    }

    if (typeof r === 'number' && typeof l === 'string') {
      return r === parseInt(l)
    }

    return false
  }

  /**
   * Compare null (null == undefined == '')
   * @memberof Utils/Differ
   * @function after
   * @private
   * @param  {Mixed} l left value
   * @param  {Mixed} r right value
   * @return {Boolean} Do they match?
   */
  _compareNull (l, r) {
    return (l === null || l === undefined || l === '') && (r === null || r === undefined || r === '')
  }

  /**
   * Array of fields that have changed
   * @memberof Utils/Differ
   * @return {Array}
   *
   * @example
   * new Differ(lObject, rObject).changed
   * // returns [ 'someProperty', 'anotherProperty' ]
   */
  get changed () {
    return Object.keys(this.diff)
  }

  /**
   * Object with changed fields, as they were before changes (in lhs)
   * @memberof Utils/Differ
   * @return {Object}
   *
   * @example
   * new Differ(lObject, rObject).before
   * // returns {
   * //   someProperty: 'oldValue'
   * // }
   */
  get before () {
    const before = {}
    this.changed.map(key => { before[key] = this.lhs[key] })
    return before
  }

  /**
   * Object with changed fields, as they were after changes (in rhs)
   * @memberof Utils/Differ
   * @return {Object}
   *
   * @example
   * new Differ(lObject, rObject).after
   * // returns {
   * //   someProperty: 'newValue'
   * // }
   */
  get after () {
    return this.diff
  }
}

module.exports = Differ
