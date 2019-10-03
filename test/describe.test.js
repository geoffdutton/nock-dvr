
const assert = require('assert')
const dvr = require('../')
const slug = require('slug')
const {
  assertEpisode,
  assertNotEpisode,
  getApp,
  requested
} = require('./helpers')

dvr.describe('describe', function () {
  let server

  before(function (done) {
    server = getApp().listen(4007, done)
  })

  it('slugifies a cassette - callback', function (done) {
    requested('http://localhost:4007/test', done)
  })

  it('slugifies a cassette - Promise', function () {
    return requested('http://localhost:4007/test')
  })

  it('slugifies a cassette - async', async function () {
    await requested('http://localhost:4007/test')
  })

  it('doesnt save with no requests', function () {
    assert.ok(true)
  })

  // it('catches failed tests', function () {
  //   assert(false)
  // })

  after(function (done) {
    assertEpisode('describe/' + slug('slugifies a cassette - promise'))
    assertEpisode('describe/' + slug('slugifies a cassette - callback'))
    assertEpisode('describe/' + slug('slugifies a cassette - async'))
    assertNotEpisode(slug('describe/doesnt save with no requests'))
    server.close(done)
  })
})
