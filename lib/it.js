
/* global it */
const vcr = require('nock-vcr-recorder')
const wrapMochaFn = require('./wrap-mocha-fn')
const getCassetteName = require('./get-cassette-name')

module.exports = wrapMochaFn(it, function (name, options, callback) {
  const cassette = getCassetteName(this)

  return vcr.useCassette(cassette, options || {}, () => {
    if (callback.length) { // has a done callback
      return new Promise((resolve, reject) => {
        callback.call(this, function (err) {
          if (err) {
            return reject(err)
          }

          resolve()
        })
      })
    }

    return callback.call(this)
  })
})
