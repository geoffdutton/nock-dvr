
const nock = require('nock')
const dvr = require('../lib/dvr')
const assert = require('assert').strict
const {
  assertNotEpisode,
  assertEpisode,
  getApp,
  watchEpisode,
  mockRecording,
  requested
} = require('./helpers')

const request = requested

describe('dvr.record', function () {
  const servers = []
  after(() => {
    return Promise.all(servers.map(s => {
      if (s.close) {
        return new Promise(resolve => s.close(resolve))
      }
    }))
  })
  describe('callback promises', function () {
    it('resolves', function () {
      return dvr.record('record handles resovled promises', function () {
        return Promise.resolve()
      }).then(function () {
        assert.ok(true, 'returned a promise')
      }, function () {
        assert.ok(false, 'returned an error')
      })
    })

    it('rejects', function () {
      return dvr.record('record handles rejected promises', function () {
        return Promise.reject(new Error('omg'))
      }).then(function () {
        assert.ok(false, 'returned an error')
      }, function () {
        assert.ok(true, 'returned a promise')
      })
    })
  })

  describe('requests - playback', function () {
    let called

    before(function (done) {
      called = 0

      mockRecording('plays back request')

      const app = getApp().get('/shouldnt-be-called', function (req, res) {
        called++
        res.send('ok')
      })

      // Actual test
      servers.push(app.listen(4007, done))
    })

    it('plays back cached requests', function () {
      dvr.record('plays back request', function () {
        return request('http://localhost:4007/shouldnt-be-called')
      }).then(function () {
        assert.equal(called, 0, 'should not have been called')
      })
    })
  })

  describe('requests - recording', function () {
    before(function (done) {
      servers.push(getApp().listen(4006, done))
    })

    it('saves a cassette with the server response', function () {
      return dvr.record('real request', function () {
        return request('http://localhost:4006/test')
      }).then(function () {
        assertEpisode('real request')
      })
    })

    it('doesn\'t save a file when no requests are made', function () {
      return dvr.record('no file with no request', function () {
        return assert(true)
      }).then(function () {
        assertNotEpisode('no file with no request')
      })
    })

    describe('makes sure nock is active', function () {
      beforeEach(function () {
        mockRecording('re-activates nock')
        nock.restore()
      })

      it('re-activates nock', function () {
        assert(!nock.isActive(), 'nock is disabled')

        return dvr.record('re-activates nock', function () {
          return assert(true)
        }).then(function () {
          assert(nock.isActive(), 'nock was reactivated')
        })
      })
    })

    it('excludes array of urls', function () {
      return dvr.record('excludeScope array', {
        excludeScope: ['poeticsystems.com', 'github.com']
      }, function () {
        return request('https://github.com/poetic.json')
      }).then(function () {
        const cassette = watchEpisode('excludeScope array')

        assert.equal(cassette.length, 0)
      })
    })

    it('excludes a string url', function () {
      return dvr.record('excludeScope string', {
        excludeScope: 'github.com'
      }, function () {
        return request('https://github.com/poetic.json')
      }).then(function () {
        const cassette = watchEpisode('excludeScope string')

        assert.equal(cassette.length, 0)
      })
    })

    describe('all mode', function () {
      before(function () {
        dvr.config({ excludeScope: [] })
        mockRecording('overwrites existing cassette')
      })

      it('overwrites existing cassette', function () {
        return dvr.record('overwrites existing cassette', {
          mode: 'all'
        }, function () {
          return request('http://localhost:4006/test')
        }).then(function () {
          const cassette = watchEpisode('overwrites existing cassette')

          assert.equal(cassette.length, 1, '0 !== 1 : recorded one request')
          assert.equal(cassette[0].response, 'ok')
        })
      })
    })

    describe('writeOnFailure', function () {
      it('doesnt save when test fails', function () {
        return dvr.record('doesnt save when test fails', {
          writeOnFailure: false
        }, function () {
          return request('http://localhost:4006/test').then(function () {
            return Promise.reject(new Error('mock failed test'))
          })
        }).then(null, function () {
          assertNotEpisode('doesnt save when test fails')
        })
      })

      it('saves when test fails', function () {
        return dvr.record('saves when test fails', {
          writeOnFailure: true
        }, function () {
          return request('http://localhost:4006/test').then(function () {
            return Promise.reject(new Error('mock failed test'))
          })
        }).then(null, function () {
          assertEpisode('saves when test fails')
        })
      })
    })
  })
})
