'use strict'

const assert = require('assert')
const dvr = require('../')
const slug = require('slug')
const {
  requested,
  readCassette
} = require('./helpers')

dvr.describe('config - describe', {
  excludeScope: ['github.com']
}, function () {
  it('excludes github', function (done) {
    requested('https://github.com/poetic.json', done)
  })

  after(function () {
    const cassette = readCassette(slug('config - describe') + '/' + slug('excludes github'))

    assert.strictEqual(cassette.length, 0)
  })
})

describe('config - it', function () {
  dvr.it('excludes github', {
    excludeScope: ['github.com']
  }, function (done) {
    requested('https://github.com/poetic.json', done)
  })

  after(function () {
    const cassette = readCassette(slug('config - it') + '/' + slug('excludes github'))

    assert.strictEqual(cassette.length, 0)
  })
})
