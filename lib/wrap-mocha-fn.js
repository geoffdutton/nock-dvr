
const assert = require('assert')

module.exports = (method, mainCb) => {
  function wrapper (name, filter, options, callback) {
    let mochaMethod = method

    if (typeof filter === 'function') {
      callback = filter
      filter = null
      options = {}
    } else if (typeof filter === 'object' && typeof options === 'function') {
      callback = options
      options = filter
      filter = null
    }

    assert.ok(name, 'name should be defined')
    assert.ok(callback, 'callback should be defined')

    if (filter) {
      mochaMethod = method[filter]
    }

    return mochaMethod(name, function () {
      return mainCb.call(this, name, options, callback)
    })
  }

  wrapper.only = function (name, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = null
    }

    return wrapper(name, 'only', options, callback)
  }

  wrapper.skip = function (name, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = null
    }

    return wrapper(name, 'skip', options, callback)
  }

  return wrapper
}
