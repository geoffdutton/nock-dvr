
const dvr = require('./dvr')
const wrapMochaFn = require('./wrap-mocha-fn')
const getCassetteName = require('./get-recording-title')

module.exports = wrapMochaFn(describe, function (name, options, callback) {
  callback.call(this)

  let resolver
  let rejecter
  let recorder
  beforeEach(function () {
    const promise = new Promise((resolve, reject) => {
      resolver = resolve
      rejecter = reject
    })

    const cassette = getCassetteName(this)
    recorder = dvr.record(cassette, options || {}, () => promise)
  })

  afterEach(function () {
    const failed = this.currentTest.state === 'failed'

    if (failed) {
      rejecter(failed)
    } else {
      resolver()
    }

    return recorder
  })
})
