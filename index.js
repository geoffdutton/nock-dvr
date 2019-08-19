
const vcr = require('nock-vcr-recorder')
const describe = require('./lib/describe')
const it = require('./lib/it')

module.exports = {
  describe,
  it,
  config: vcr.config.bind(vcr)
}
