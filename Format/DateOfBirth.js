'use strict'

const Moment = require('moment')

/**
 * Return form field options and values for date of birth
 *
 * @module Format/DateOfBirth
 * @requires moment
 * @param  {String} [dateOfBirth] Partial or complete URL
 * @return {Object}               Select options and selected values ready for select mixins
 *
 * @example
 * DateOfBirth('1995-03-05')
 *
 * // returns {
 * //   days: [{label: '1', value: '01'}, {label: '1', value: '02'}...],
 * //   months: [{label: 'January', value: '01'}, {label: 'February', value: '02'}...],
 * //   years: [{label: '1920', value: '1920'}, {label: '1921', value: '1921'}...],
 * //   day: '05',
 * //   month: '03',
 * //   year: '1995'
 * // }
 */
module.exports = (dateOfBirth) => {
  const currentYear = Moment().format('YYYY')

  let year = (currentYear - 30).toString()
  let month = '01'
  let day = '01'

  if (dateOfBirth && typeof dateOfBirth === 'string') {
    const split = dateOfBirth.split('-')
    year = split[0]
    month = split[1]
    day = split[2]
  }

  const years = []
  Array.from(Array(100).keys()).forEach(index => {
    index = currentYear - index - 8
    years.push({
      label: index.toString(),
      value: index.toString()
    })
  })

  const days = []
  Array.from(Array(31).keys()).forEach(index => {
    const str = `${index + 1}`
    days.push({
      label: str,
      value: (`0${str}`).slice(-2)
    })
  })

  const months = [
    {
      label: 'January',
      value: '01'
    },
    {
      label: 'February',
      value: '02'
    },
    {
      label: 'March',
      value: '03'
    },
    {
      label: 'April',
      value: '04'
    },
    {
      label: 'May',
      value: '05'
    },
    {
      label: 'June',
      value: '06'
    },
    {
      label: 'July',
      value: '07'
    },
    {
      label: 'August',
      value: '08'
    },
    {
      label: 'September',
      value: '09'
    },
    {
      label: 'October',
      value: '10'
    },
    {
      label: 'November',
      value: '11'
    },
    {
      label: 'December',
      value: '12'
    }
  ]

  return {
    years,
    months,
    days,
    year,
    month,
    day
  }
}
