'use strict'

const chai = require('chai')
const expect = chai.expect

const ParseBool = require('../Parse/Bool')
const StringArrayToNumberArray = require('../Parse/StringArrayToNumberArray')

describe('Parse Radio button helper', () => {
  it('Parse a true value', () => {
    expect(ParseBool('true')).to.equal(true)
    expect(ParseBool('1')).to.equal(true)
    expect(ParseBool(true)).to.equal(true)
    expect(ParseBool(1)).to.equal(true)
  })

  it('Parse a false value', () => {
    expect(ParseBool('false')).to.equal(false)
    expect(ParseBool('0')).to.equal(false)
    expect(ParseBool(false)).to.equal(false)
    expect(ParseBool(0)).to.equal(false)
  })

  it('Parse a null value', () => {
    expect(ParseBool()).to.equal(null)
    expect(ParseBool('')).to.equal(null)
    expect(ParseBool(null)).to.equal(null)
    expect(ParseBool('null')).to.equal(null)
    expect(ParseBool(undefined)).to.equal(null)
    expect(ParseBool('undefined')).to.equal(null)
  })
})

describe('StringArrayToNumberArray Helper', () => {
  it('User passes through a null', () => {
    const request = null
    expect(StringArrayToNumberArray(request)).to.deep.equal([])
  })

  it('User passes through an empty array', () => {
    const request = []
    expect(StringArrayToNumberArray(request)).to.deep.equal([])
  })

  it('User passes through an array of strings', () => {
    const request = ['1', '2', '3']
    expect(StringArrayToNumberArray(request)).to.deep.equal([1, 2, 3])
  })

  it('User passes through an array of strings containing non-numbers', () => {
    const request = ['1', 'A', '3']
    expect(StringArrayToNumberArray(request)).to.deep.equal([1, 3])
  })

  it('User passes through a single string', () => {
    const request = '1'
    expect(StringArrayToNumberArray(request)).to.deep.equal([1])
  })
})
