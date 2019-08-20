
const useRecording = require('./use-recording')

module.exports = {
  record (episode, options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return useRecording(episode, Object.assign({}, this._config, options), cb)
  },

  _config: {
    excludeScope: ['localhost', '127.0.0.1', '0.0.0.0'],
    cassetteLibraryDir: 'cassettes',
    writeOnFailure: false
  },

  config (newConfig) {
    Object.assign(this._config, newConfig, this._config)
  },

  nockReset: useRecording.nockReset
}
