
const fs = require('fs')
const path = require('path')
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

function readCassette (name) {
  return JSON.parse(
    fs.readFileSync(cassettePath(name), 'utf8')
  )
}

module.exports = {
  assertCassette,
  assertNotCassette,
  cassettePath,
  readCassette
}
