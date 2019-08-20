
const assert = require('assert')
const app = require('./app')
const dvr = require('../')
const slug = require('slug')
const {
  assertCassette,
  assertNotCassette,
  requested
} = require('./helpers')

dvr.describe('describe', function () {
  before(function (done) {
    this.server = app.listen(4007, done)
  })

  it('slugifies a cassette - callback', function (done) {
    requested('http://localhost:4007/test', done)
  })

  it('slugifies a cassette - Promise', function () {
    return requested('http://localhost:4007/test')
  })

  it('doesnt save with no requests', function () {
    assert.ok(true)
  })

  after(function (done) {
    assertCassette('describe/' + slug('slugifies a cassette - promise'))
    assertCassette('describe/' + slug('slugifies a cassette - callback'))
    assertNotCassette(slug('describe/doesnt save with no requests'))
    this.server.close(done)
  })
})
