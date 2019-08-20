
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const assert = require('assert')

function assertCassette (name) {
  assert(fs.existsSync(cassettePath(name)),
    'cassette "' + name + '" should exist')
}

function assertNotCassette (name) {
  assert(!fs.existsSync(cassettePath(name)),
    'cassette "' + name + '" should exist')
}

function cassettePath (name) {
  return path.resolve(
    path.join('cassettes', name + '.json')
  )
}

function mockRecordedCassette (name) {
  const fileContents = fs.readFileSync(
    path.join(__dirname, 'test-cassettes', name + '.json'),
    { encoding: 'utf8' }
  )
  const filePath = cassettePath(name)
  mkdirp.sync(path.dirname(filePath))
  fs.writeFileSync(filePath, fileContents)
}

function readCassette (name) {
  return JSON.parse(
    fs.readFileSync(cassettePath(name), 'utf8')
  )
}

const req = require('request')
const reqd = require('util').promisify(req)
function requested (url, callback) {
  if (!callback) {
    return reqd(url)
  }

  req(url, callback)
}

module.exports = {
  assertCassette,
  assertNotCassette,
  mockRecordedCassette,
  readCassette,
  requested
}
