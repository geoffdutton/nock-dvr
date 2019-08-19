
const assert = require('assert')
const request = require('request')
const app = require('./app')
const vcr = require('../')
const slug = require('slug')
const {
  assertCassette,
  assertNotCassette
} = require('./helpers')

vcr.describe('describe', function () {
  before(function (done) {
    this.server = app.listen(4007, done)
  })

  it('slugifies a cassette - callback', function (done) {
    request('http://localhost:4007/test', done)
  })

  it('slugifies a cassette - Promise', function () {
    return new Promise((resolve, reject) => {
      request('http://localhost:4007/test', (err, res) => err ? reject(err) : resolve(res))
    })
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
