
const assert = require('assert')
const app = require('./app')
const vcr = require('../')
const slug = require('slug')
const {
  assertCassette,
  assertNotCassette,
  requested
} = require('./helpers')

describe('it', function () {
  const testUrl = 'http://localhost:4006/test'
  before(function (done) {
    this.server = app.listen(4006, done)
  })

  vcr.it('slugifies a cassette - callback', function (done) {
    requested(testUrl, done)
  })

  vcr.it('slugifies a cassette - Promise', function () {
    return requested(testUrl)
  })

  it('doesnt save with no requests', function () {
    assert.ok(true)
  })

  after(function (done) {
    assertCassette('it/' + slug('slugifies a cassette - callback'))
    assertCassette('it/' + slug('slugifies a cassette - promise'))
    assertNotCassette(slug('it/doesnt save with no requests'))
    this.server.close(done)
  })
})
