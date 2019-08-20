
const dvr = require('./lib/dvr')
const describe = require('./lib/describe')
const it = require('./lib/it')

module.exports = {
  describe,
  it,
  config: dvr.config.bind(dvr)
}
