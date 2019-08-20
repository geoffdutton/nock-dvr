
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const assert = require('assert')

function episodePath (name) {
  return path.resolve(
    path.join('cassettes', name + '.json')
  )
}

function assertEpisode (name) {
  assert(fs.existsSync(episodePath(name)),
    'cassette "' + name + '" should exist')
}

function deleteEpisode (name) {
  name = episodePath(name)
  if (fs.existsSync(name)) {
    fs.unlinkSync(name)
  }
}

function assertNotEpisode (name) {
  assert(!fs.existsSync(episodePath(name)),
    'cassette "' + name + '" should exist')
}

function mockRecording (name) {
  const fileContents = fs.readFileSync(
    path.join(__dirname, 'test-cassettes', name + '.json'),
    { encoding: 'utf8' }
  )
  const filePath = episodePath(name)
  mkdirp.sync(path.dirname(filePath))
  fs.writeFileSync(filePath, fileContents)
}

function watchEpisode (name) {
  return JSON.parse(
    fs.readFileSync(episodePath(name), 'utf8')
  )
}

function requested (url, callback) {
  const req = require('request')
  if (!callback) {
    return require('util').promisify(req)(url)
  }

  req(url, callback)
}

function getApp () {
  const app = require('express')()

  app.get('/test', function (req, res) {
    res.send('ok')
  })

  return app
}

module.exports = {
  assertEpisode,
  assertNotEpisode,
  deleteEpisode,
  getApp,
  mockRecording,
  watchEpisode,
  requested
}
