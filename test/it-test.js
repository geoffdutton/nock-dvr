
const assert = require('assert')
const request = require('request')
const app = require('./app')
const vcr = require('../')
const slug = require('slug')
const {
  assertCassette,
  assertNotCassette
} = require('./helpers')

describe('it', function () {
  before(function (done) {
    this.server = app.listen(4006, done)
  })

  vcr.it('slugifies a cassette - callback', function (done) {
    request('http://localhost:4006/test', done)
  })

  vcr.it('slugifies a cassette - Promise', function () {
    return new Promise((resolve, reject) => {
      request('http://localhost:4006/test', (err, res) => err ? reject(err) : resolve(res))
    })
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
