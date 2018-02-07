'use strict'

const chai = require('chai')
const expect = chai.expect
const Moment = require('moment')

const BuildUrl = require('../Format/BuildUrl')
const Checkboxify = require('../Format/Checkboxify')
const CleanObject = require('../Format/CleanObject')
const DateOfBirth = require('../Format/DateOfBirth')
const FormatErrors = require('../Format/Errors')
const HiddenBool = require('../Format/HiddenBool')
const Sanitize = require('../Format/Sanitize')
const Selectify = require('../Format/Selectify')
const SelectNestify = require('../Format/SelectNestify')
const TitleFilters = require('../Format/TitleFilters')

describe('Url Helper', () => {
  it('Build a URL with a basic path', () => {
    expect(BuildUrl('http://my-website/', 'admin/path')).to.equal('http://my-website/admin/path')
    expect(BuildUrl('http://my-website/', 'admin')).to.equal('http://my-website/admin')
  })

  it('Build a URL with a query string', () => {
    const params = {
      foo: 'bar'
    }

    expect(BuildUrl('http://my-website/', 'admin/path', params)).to.equal('http://my-website/admin/path?foo=bar')
  })

  it('Build a URL with mutliple query params', () => {
    const params = {
      foo: 'bar',
      wibble: 'wobble'
    }

    expect(BuildUrl('http://my-website/', 'admin/path', params)).to.equal('http://my-website/admin/path?foo=bar&wibble=wobble')
  })

  it('Ignore a null query param', () => {
    const params = {
      foo: null,
      wibble: 'wobble'
    }

    expect(BuildUrl('http://my-website/', 'admin/path', params)).to.equal('http://my-website/admin/path?wibble=wobble')
  })

  it('Ignore an empty string query param', () => {
    const params = {
      foo: 'bar',
      wibble: ''
    }

    expect(BuildUrl('http://my-website/', 'admin/path', params)).to.equal('http://my-website/admin/path?foo=bar')
  })

  it('Ignore completely null query param', () => {
    const params = {
      foo: null,
      wibble: ''
    }

    expect(BuildUrl('http://my-website/', 'admin/path', params)).to.equal('http://my-website/admin/path')
  })

  it('Build a URL with a hash', () => {
    expect(BuildUrl('http://my-website/', 'admin/path', null, 'myHash')).to.equal('http://my-website/admin/path#myHash')

    const params = {
      foo: 'bar',
      wibble: 'wobble'
    }

    expect(BuildUrl('http://my-website/', 'admin', params, 'myHash')).to.equal('http://my-website/admin?foo=bar&wibble=wobble#myHash')
  })
})

describe('checkboxify helper function', () => {
  it('Converting a null returns an empty array', () => {
    expect(Checkboxify(null)).to.be.empty
  })

  it('Passing in A collection returns checkboxed value', () => {
    const ModelData = [
      {
        'name': 'Huey',
        'value': '1',
        'isSelected': 'true'
      },
      {
        'name': 'Dewey',
        'value': '2',
        'isSelected': 'false'
      },
      {
        'name': 'Louie',
        'value': '3',
        'isSelected': 'true'
      }
    ]

    const res = Checkboxify(ModelData, 'isSelected', 'name', 'value')
    expect(res[0].label).to.equal('Huey')
    expect(res[1].label).to.equal('Dewey')
    expect(res[2].label).to.equal('Louie')

    expect(res[0].value).to.equal('1')
    expect(res[1].value).to.equal('2')
    expect(res[2].value).to.equal('3')

    expect(res[0].checked).to.equal('true')
    expect(res[1].checked).to.equal('false')
    expect(res[2].checked).to.equal('true')
  })
})

describe('Clean object helper', () => {
  it('removed undefined values from an array', () => {
    const test = {
      myValue: 'String',
      myNumber: 2,
      myObj: {
        key: 'value'
      },
      myArray: [
        1, 2, 3
      ],
      myNull: null,
      myEmpty: '',
      myNaN: parseInt(''),
      myBool: true,
      myUndef: undefined,
      myFunc: () => true
    }

    const result = {
      myValue: 'String',
      myNumber: 2,
      myObj: {
        key: 'value'
      },
      myArray: [
        1, 2, 3
      ],
      myNull: null,
      myEmpty: '',
      myBool: true,
      myFunc: () => true
    }

    const obj = CleanObject(test)

    Object.keys(result).forEach(key => expect(typeof obj[key]).to.equal(typeof result[key]))
    Object.keys(obj).forEach(key => expect(typeof obj[key]).to.equal(typeof result[key]))
  })
})

describe('DateOfBirth Helper', () => {
  it('Return select field options', () => {
    const dateOfBirth = DateOfBirth()
    expect(dateOfBirth.days).to.be.an('array')
    expect(dateOfBirth.days.length).to.equal(31)
    expect(dateOfBirth.years).to.be.an('array')
    expect(dateOfBirth.years.length).to.equal(100)
    expect(dateOfBirth.months).to.be.an('array')
    expect(dateOfBirth.months.length).to.equal(12)
    expect(dateOfBirth.days[0].label).to.equal('1')
    expect(dateOfBirth.days[0].value).to.equal('01')
    expect(dateOfBirth.years[0].label).to.equal(Moment().subtract(8, 'years').format('YYYY'))
  })

  it('Return default selected dates', () => {
    let dateOfBirth = DateOfBirth()
    expect(dateOfBirth.day).to.equal('01')
    expect(dateOfBirth.month).to.equal('01')
    expect(dateOfBirth.year).to.equal(Moment().subtract(30, 'years').format('YYYY'))

    dateOfBirth = DateOfBirth(1)
    expect(dateOfBirth.day).to.equal('01')
    expect(dateOfBirth.month).to.equal('01')
    expect(dateOfBirth.year).to.equal(Moment().subtract(30, 'years').format('YYYY'))
  })

  it('Return selected dates', () => {
    const dateOfBirth = DateOfBirth('2001-04-05')
    expect(dateOfBirth.day).to.equal('05')
    expect(dateOfBirth.month).to.equal('04')
    expect(dateOfBirth.year).to.equal('2001')
  })
})

describe('Format errors helper', () => {
  it('Should format error array into object', () => {
    const array = [
      {
        field: 'name',
        rule: 'required',
        message: 'Name is required'
      },
      {
        field: 'name',
        rule: 'max',
        message: 'Name is too long'
      },
      {
        field: 'password',
        rule: 'required',
        message: 'Password is required'
      }
    ]

    const object = {
      name: 'Name is required. Name is too long',
      password: 'Password is required'
    }

    expect(FormatErrors(array)).to.deep.equal(object)
  })
})

describe('Hidden Bool helper', () => {
  it('Parse a true value', () => {
    expect(HiddenBool('true')).to.equal('true')
    expect(HiddenBool('1')).to.equal('true')
    expect(HiddenBool(true)).to.equal('true')
    expect(HiddenBool(1)).to.equal('true')
  })

  it('Parse a false value', () => {
    expect(HiddenBool('false')).to.equal('false')
    expect(HiddenBool('0')).to.equal('false')
    expect(HiddenBool(false)).to.equal('false')
    expect(HiddenBool(0)).to.equal('false')
  })

  it('Parse a null value', () => {
    expect(HiddenBool()).to.equal('')
    expect(HiddenBool('')).to.equal('')
    expect(HiddenBool(null)).to.equal('')
    expect(HiddenBool('null')).to.equal('')
    expect(HiddenBool(undefined)).to.equal('')
    expect(HiddenBool('undefined')).to.equal('')
  })
})

describe('Number Sanitation', () => {
  it('returns null for an empty string', () => {
    expect(Sanitize.numeric('')).to.be.null
  })

  it('returns null for a null ', () => {
    expect(Sanitize.numeric(null)).to.be.null
  })

  it('returns undefined for undefined', () => {
    expect(Sanitize.numeric('')).to.be.null
    expect(Sanitize.numeric(null)).to.be.null
    expect(Sanitize.numeric(undefined)).to.be.undefined
  })

  it('correctly removes alphas from a mixed string, returning only numbers', () => {
    expect(Sanitize.numeric('a1bc2h3')).to.equal('123')
  })

  it('correctly keeps whitespace from a mixed string returning only numbers', () => {
    expect(Sanitize.numeric('12 3')).to.equal('12 3')
  })

  it('Correctly returns null for a string with no numeric characters', () => {
    expect(Sanitize.numeric('ABCDEF')).to.be.null
  })
})

describe('Alpha Sanitation', () => {
  it('Leaves a blank field as it is', () => {
    expect(Sanitize.alpha('')).to.be.null
    expect(Sanitize.alpha(null)).to.be.null
    expect(Sanitize.alpha(undefined)).to.be.undefined
  })

  it('correctly removes alphas from a mixed string, returning only alphas', () => {
    expect(Sanitize.alpha('a1bc2d3')).to.equal('abcd')
  })

  it('correctly preserves whitespace in a mixed string returning only alphas', () => {
    expect(Sanitize.alpha('ab c')).to.equal('ab c')
  })

  it('Correctly returns null for a string with no alpha characters', () => {
    expect(Sanitize.alpha('123456')).to.be.null
  })
})

describe('AlphaNumeric Sanitation', () => {
  it('Leaves a blank field as it is', () => {
    expect(Sanitize.alphaNumeric('')).to.be.null
    expect(Sanitize.alphaNumeric(null)).to.be.null
    expect(Sanitize.alphaNumeric(undefined)).to.be.undefined
  })

  it('correctly removes non alphanumerics from a mixed string, returning only alphas and numbers', () => {
    expect(Sanitize.alphaNumeric('a#1*b-c2d3')).to.equal('a1bc2d3')
  })

  it('correctly preserves whitespace in a mixed string returning only alphas and numerics', () => {
    expect(Sanitize.alphaNumeric('ab c')).to.equal('ab c')
  })

  it('Correctly returns null for a string with no alpha or numeric characters', () => {
    expect(Sanitize.alphaNumeric('!@£$%^&*()_+=-[];\'\\,./<>?:"|{}"')).to.be.null
  })
})

describe('Date Sanitation', () => {
  it('Leaves a blank field as it is', () => {
    expect(Sanitize.optionalDate('')).to.be.null
    expect(Sanitize.optionalDate(null)).to.be.null
    expect(Sanitize.optionalDate(undefined)).to.be.undefined
  })

  it('Leaves a correctly formatted date as it is', () => {
    const date = '2017-02-03'
    expect(Sanitize.optionalDate(date)).to.equal(date)
  })

  it('Leaves a non-date as it is', () => {
    const date = '5317-02-33'
    expect(Sanitize.optionalDate(date)).to.equal(date)
  })

  it('Converts format of real date', () => {
    const date = 'Mon Jul 17 2017'
    const correctDate = '2017-07-17'
    expect(Sanitize.optionalDate(date)).to.equal(correctDate)
  })
})

describe('username Sanitation', () => {
  it('Leaves a blank username as it is', () => {
    expect(Sanitize.username('')).to.be.null
    expect(Sanitize.username(null)).to.be.null
    expect(Sanitize.username(undefined)).to.be.undefined
  })
  it('Leaves strips only the first @ from a username', () => {
    expect(Sanitize.username('@@username')).to.equal('@username')
    expect(Sanitize.username('@username')).to.equal('username')
  })
  it('Doesn\'t strip @ from within the string, that are not the first character', () => {
    expect(Sanitize.username('@@usern@me')).to.equal('@usern@me')
    expect(Sanitize.username('@usern@me')).to.equal('usern@me')
  })
  it('Leaves strips only the first + from a username', () => {
    expect(Sanitize.username('++username')).to.equal('+username')
    expect(Sanitize.username('+username')).to.equal('username')
  })
  it('Doesn\'t strip + from within the string, that are not the first character', () => {
    expect(Sanitize.username('++usern+me')).to.equal('+usern+me')
    expect(Sanitize.username('+usern+me')).to.equal('usern+me')
  })
  it('Doesn\'t strip Leaves Second identifier if presented in @+ or +@', () => {
    expect(Sanitize.username('@+username')).to.equal('+username')
    expect(Sanitize.username('+@username')).to.equal('@username')
  })
})

describe('Url Sanitizer', () => {
  it('Leaves a complete url as it is', () => {
    const url = 'http://google.com'
    expect(Sanitize.urlProtocol(url)).to.equal(url)
  })

  it('Leaves a null or empty value as it is', () => {
    let url = ''
    expect(Sanitize.urlProtocol(url)).to.equal(url)
    url = null
    expect(Sanitize.urlProtocol(url)).to.equal(url)
    url = undefined
    expect(Sanitize.urlProtocol(url)).to.equal(url)
  })

  it('Leaves a complete https url as it is', () => {
    const url = 'https://google.com'
    expect(Sanitize.urlProtocol(url)).to.equal(url)
  })

  it('Appends http to an incomplete url', () => {
    const url = 'google.com'
    const completeUrl = 'http://google.com'
    expect(Sanitize.urlProtocol(url)).to.equal(completeUrl)
  })
})

describe('Selectify helper function', () => {
  it('Convert an object to an array', () => {
    const object = {
      foo: 'bar',
      leaf: 'tree'
    }
    const options = Selectify(object)

    expect(options).to.deep.equal([
      {
        label: ' ',
        value: null
      },
      {
        label: 'bar',
        value: 'foo'
      },
      {
        label: 'tree',
        value: 'leaf'
      }
    ])
  })

  it('Convert an object to an array with specified first item', () => {
    const object = {
      leaf: 'tree',
      foo: 'bar'
    }
    const options = Selectify(object, {
      label: 'Select an option',
      value: 'default'
    })

    expect(options).to.deep.equal([
      {
        label: 'Select an option',
        value: 'default'
      },
      {
        label: 'tree',
        value: 'leaf'
      },
      {
        label: 'bar',
        value: 'foo'
      }
    ])
  })

  it('Convert an object to an array, sort by label', () => {
    const object = {
      leaf: 'tree',
      'leaf-2': 'tree',
      dog: 'woof',
      foo: 'bar'
    }
    const options = Selectify(object, null, true)

    expect(options).to.deep.equal([
      {
        label: ' ',
        value: null
      },
      {
        label: 'bar',
        value: 'foo'
      },
      {
        label: 'tree',
        value: 'leaf'
      },
      {
        label: 'tree',
        value: 'leaf-2'
      },
      {
        label: 'woof',
        value: 'dog'
      }
    ])
  })
})

describe('SelectNestify helper function', () => {
  it('Convert to nested array for object', () => {
    const array = [
      {
        id: 1,
        name: 'rebels',
        team: [
          {
            id: 2,
            name: 'leia'
          },
          {
            id: 3,
            name: 'luke'
          }
        ]
      },
      {
        id: 4,
        name: 'empire',
        team: [
          {
            id: 5,
            name: 'vader'
          },
          {
            id: 6,
            name: 'tarkin'
          }
        ]
      },
      {
        id: 7,
        name: 'gungans'
      }
    ]
    const options = SelectNestify(array, 'id', 'name', 'team')

    expect(options).to.deep.equal([
      {
        label: ' ',
        value: null
      },
      {
        label: 'rebels',
        children: [
          {
            label: 'leia',
            value: 2
          },
          {
            label: 'luke',
            value: 3
          }
        ]
      },
      {
        label: 'empire',
        children: [
          {
            label: 'vader',
            value: 5
          },
          {
            label: 'tarkin',
            value: 6
          }
        ]
      },
      {
        label: 'gungans',
        children: []
      }
    ])
  })
})

describe('Title Filters helper funtion', () => {
  it('Set the total', () => {
    expect(TitleFilters(50)).to.equal(' (50)')
    expect(TitleFilters(15)).to.equal(' (15)')
    expect(TitleFilters(0)).to.equal(' (0)')
  })

  it('Set a filter', () => {
    expect(TitleFilters(50, {status: 'published'})).to.equal(' - published (50)')
    expect(TitleFilters(10, {profileStatus: 'published'})).to.equal(' - published (10)')
    expect(TitleFilters(5, {depot: 'EDS Couriers'})).to.equal(' - EDS Couriers (5)')
  })

  it('Ignore empty filter', () => {
    expect(TitleFilters(50, {status: 'published', depot: null})).to.equal(' - published (50)')
    expect(TitleFilters(10, {profileStatus: 'published', status: undefined})).to.equal(' - published (10)')
    expect(TitleFilters(5, {depot: 'EDS Couriers', merchant: ''})).to.equal(' - EDS Couriers (5)')
  })

  it('Set multiple filters', () => {
    expect(TitleFilters(50, {status: 'published', depot: 'EDS Couriers'})).to.equal(' - published & EDS Couriers (50)')
    expect(TitleFilters(50, {someNullValue: null, status: 'published', depot: 'EDS Couriers'})).to.equal(' - published & EDS Couriers (50)')
  })
})
