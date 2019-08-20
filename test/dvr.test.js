
const assert = require('assert').strict
const dvr = require('../lib/dvr')

describe('dvr - config', function () {
  beforeEach(() => {
    // Reset to default config
    dvr._config = {
      excludeScope: ['localhost', '127.0.0.1', '0.0.0.0'],
      cassetteLibraryDir: 'cassettes'
    }
  })

  it('#config changes default', function () {
    assert.deepEqual(dvr._config, {
      excludeScope: ['localhost', '127.0.0.1', '0.0.0.0'],
      cassetteLibraryDir: 'cassettes'
    })

    dvr.config({ cassetteLibraryDir: 'test/cassettes' })

    assert.deepEqual(dvr._config, {
      excludeScope: ['localhost', '127.0.0.1', '0.0.0.0'],
      cassetteLibraryDir: 'test/cassettes'
    })
  })

  it('dvr specific config doesn\'t modify global default', function () {
    return dvr.record('test config', {
      excludeScope: ['github.com']
    }, function () {
      return Promise.resolve()
    }).then(function () {
      assert.deepEqual(dvr._config, {
        excludeScope: ['localhost', '127.0.0.1', '0.0.0.0'],
        cassetteLibraryDir: 'cassettes'
      })
    })
  })
})
