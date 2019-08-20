/**
 * Test file for Mocha or [Jest** in time] showing the combined
 * which shows agnostic behavior
 */
const assert = require('assert')
const app = require('./app')
const dvr = require('../')
const slug = require('slug')
const {
  assertEpisode,
  assertNotEpisode,
  deleteEpisode,
  requested
} = require('./helpers')

describe('it', function () {
  let server
  const testUrl = 'http://localhost:4006/test'

  const episodes = [
    'it/' + slug('slugifies a cassette - callback'),
    'it/' + slug('slugifies a cassette - promise')
  ]

  before(function (done) {
    episodes.forEach(ep => deleteEpisode(ep))
    server = app.listen(4006, done)
  })

  dvr.it('slugifies a cassette - callback', done => {
    requested(testUrl, done)
  })

  dvr.it('slugifies a cassette - Promise', () => {
    return requested(testUrl)
  })

  dvr.it('doesnt save with no requests', function () {
    assert.ok(true)
  })

  after(done => {
    console.log('before after')
    episodes.forEach(ep => assertEpisode(ep))
    assertNotEpisode(slug('it/doesnt save with no requests'))

    server.close(done)
  })
})
