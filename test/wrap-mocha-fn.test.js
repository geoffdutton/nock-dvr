
const assert = require('assert').strict
const wrapFn = require('../lib/wrap-mocha-fn')

const createSpy = () => {
  const callArgs = []
  function theSpy () {
    callArgs.push(arguments)
  }

  theSpy.calls = callArgs

  return theSpy
}

describe('wrap-mocha-fn', () => {
  let fakeMocha
  let callback

  beforeEach(() => {
    callback = createSpy()
    fakeMocha = createSpy()
    fakeMocha.skip = createSpy()
    fakeMocha.only = createSpy()
  })

  it('should call with .only', () => {
    let wrappedFn = wrapFn(fakeMocha, callback)
    wrappedFn.only('test name for .only', callback)
    assert.equal(fakeMocha.only.calls.length, 1)
    assert.equal(fakeMocha.skip.calls.length, 0)
    assert.equal(fakeMocha.calls.length, 0)

    wrappedFn = wrapFn(fakeMocha, callback)
    wrappedFn.only('test name for .only', {}, callback)
    assert.equal(fakeMocha.only.calls.length, 2)
    assert.equal(fakeMocha.skip.calls.length, 0)
    assert.equal(fakeMocha.calls.length, 0)
  })

  it('should call with .skip', () => {
    let wrappedFn = wrapFn(fakeMocha, callback)
    wrappedFn.skip('test name for .skip', callback)
    assert.equal(fakeMocha.skip.calls.length, 1)
    assert.equal(fakeMocha.only.calls.length, 0)
    assert.equal(fakeMocha.calls.length, 0)

    wrappedFn = wrapFn(fakeMocha, callback)
    wrappedFn.skip('test name for .skip', {}, callback)
    assert.equal(fakeMocha.skip.calls.length, 2)
    assert.equal(fakeMocha.only.calls.length, 0)
    assert.equal(fakeMocha.calls.length, 0)
  })
})
