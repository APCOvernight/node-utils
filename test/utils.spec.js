'use strict'

const chai = require('chai')
const expect = chai.expect

const Differ = require('../Utils/Differ')

describe('Differ Util', () => {
  it('Get diff between 2 objects', () => {
    const a = {
      test: 'a',
      value: 5
    }

    const b = {
      test: 'a',
      value: 6
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({value: 6})
  })

  it('Get diff when there are no changes', () => {
    const a = {
      test: 'a',
      value: 8
    }

    const b = {
      test: 'a',
      value: 8
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({})
  })

  it('Get diff between 2 more objects', () => {
    const a = {
      test: 'a',
      value: 5
    }

    const b = {
      test: 'b',
      value: 5
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({test: 'b'})
  })

  it('Get diff when new key is added', () => {
    const a = {
      test: 'a'
    }

    const b = {
      test: 'a',
      value: 5
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({value: 5})
  })

  it('Get diff when new key is removed', () => {
    const a = {
      test: 'a',
      value: 5
    }

    const b = {
      test: 'a'
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({})
  })

  it('Get diff between similar null objects', () => {
    const a = {
      test: undefined,
      value: null,
      key: '',
      anotherNull: null
    }

    const b = {
      test: '',
      value: undefined,
      key: null,
      anotherNull: ''
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({})
  })

  it('Get diff between similar falsy objects', () => {
    const a = {
      test: 'a',
      value: 0,
      key: false
    }

    const b = {
      test: 'a',
      value: false,
      key: 0
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({})
  })

  it('Get diff between disimilar falsy objects', () => {
    const a = {
      test: 'a',
      value: null
    }

    const b = {
      test: 'a',
      value: false
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({value: false})
  })

  it('Exclude nested objects from diffs', () => {
    const a = {
      obj: {
        a: 'a'
      }
    }

    const b = {
      obj: {
        a: 'b'
      }
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({})
  })

  it('Get diff between similar truthy objects', () => {
    const a = {
      test: 'a',
      value: 1,
      key: true
    }

    const b = {
      test: 'a',
      value: true,
      key: 1
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({})
  })

  it('Get diff between similar numbers', () => {
    const a = {
      test: 'a',
      value: 1,
      key: '1'
    }

    const b = {
      test: 'a',
      value: '1',
      key: 1
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({})

    expect(new Differ()._compareIntegers(1, 2)).to.be.false
    expect(new Differ()._compareIntegers(1, '2')).to.be.false
    expect(new Differ()._compareIntegers('1', '2')).to.be.false
    expect(new Differ()._compareIntegers('1', 2)).to.be.false
    expect(new Differ()._compareIntegers('1', null)).to.be.false
    expect(new Differ()._compareIntegers(null, '1')).to.be.false
    expect(new Differ()._compareIntegers(1, null)).to.be.false
    expect(new Differ()._compareIntegers(null, 1)).to.be.false
    expect(new Differ()._compareIntegers(1, 1)).to.be.false
    expect(new Differ()._compareIntegers('2', '2')).to.be.false
  })

  it('Get diff between different numbers', () => {
    const a = {
      test: '1',
      value: 1,
      key: 1,
      another: 1,
      yetAnother: '2'
    }

    const b = {
      test: 2,
      value: 2,
      key: '0',
      another: '1',
      yetAnother: 2
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({test: 2, value: 2, key: '0'})

    expect(new Differ()._compareIntegers(1, '1')).to.be.true
    expect(new Differ()._compareIntegers('2', 2)).to.be.true
  })

  it('Get diff between similar strings objects', () => {
    const a = {
      test: 'a',
      value: '59 Fufim Point\nSupjadag\nH6Q 6I8',
      key: '59 Fufim Point\r\nSupjadag\r\nH6Q 6I8'
    }

    const b = {
      test: 'a',
      value: '59 Fufim Point\r\nSupjadag\r\nH6Q 6I8',
      key: '59 Fufim Point\nSupjadag\nH6Q 6I8'
    }

    const diff = new Differ(a, b)

    expect(diff.diff).to.deep.equal({})
  })

  it('Get changed fields', () => {
    const a = {
      test: 'a',
      value: 5
    }

    const b = {
      test: 'b',
      value: 5
    }

    const diff = new Differ(a, b)

    expect(diff.changed[0]).to.equal('test')
  })

  it('Get before fields', () => {
    const a = {
      test: 'a',
      value: 5
    }

    const b = {
      test: 'b',
      value: 5
    }

    const diff = new Differ(a, b)

    expect(diff.before).to.deep.equal({test: 'a'})
  })

  it('Get after fields', () => {
    const a = {
      test: 'a',
      value: 5
    }

    const b = {
      test: 'b',
      value: 5
    }

    const diff = new Differ(a, b)

    expect(diff.after).to.deep.equal({test: 'b'})
  })
})
