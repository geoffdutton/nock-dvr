
const dvr = require('./dvr')
const wrapMochaFn = require('./wrap-mocha-fn')
const getRecordingTitle = require('./get-recording-title')

module.exports = wrapMochaFn(it, function (name, options, callback) {
  const episode = getRecordingTitle(this)

  return dvr.record(episode, options || {}, () => {
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
