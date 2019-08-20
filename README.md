# Nock DVR Recorder 
[![Build Status](https://travis-ci.com/geoffdutton/nock-dvr.svg?branch=master)](https://travis-ci.com/geoffdutton/nock-dvr)

## About

An updated, modern network recorder with the goal of being test framework agnostic. Inspired by:
- [nock-vcr-recorder-mocha](https://github.com/poetic-labs/nock-vcr-recorder-mocha)
- [nock-vcr-recorder](https://github.com/poetic/nock-vcr-recorder) - A wrapper around to simplify
creating vcr cassettes in mocha.

## Install

```bash
npm install --save-dev nock-dvr
```

## Usage

- [x] Works with Mocha
- [ ] Works with Jest

When you need to record cassettes you can either:

- Use `dvr.describe` instead of `describe`
- Use `dvr.it` instead of `it`

`dvr.describe` will record an episode before each test in that block. So
you can have multiple `it`s and it will record any requests within them.

`dvr.it` will record a cassette for one specific test.

They both support `.skip` and `.only` as mocha does.

```js
const request = require('request');
const assert = require('assert');
const dvr = require('nock-dvr');

describe('normal test', function() {
  dvr.it.only('works', function(done) {
    request('http://localhost:4000/users', function(err, res, body) {
      assert(!err, 'was success');
      done();
    });
  });

  it('some other test', function() {
    // You can use mocha how you normally would to group tests
  });
});

dvr.describe.skip('skipped test', function() {
  // Anything in here will be skipped
  // If the skip is removed, this request would be recorded for playback in
  // later tests
  it('makes request', function(done) {
    request('http://localhost:4000/users', function(err, res, body) {
      assert(!err, 'was success');
      done();
    });
  });
});
```

## Configuration

List of [available configuration
options](https://github.com/poetic/nock-vcr-recorder#configuration)

#### Test specific configuration

```js
dvr.it('works', {
  mode: 'all'
}, function(done) {
  request('http://localhost:4000/users', function(err, res, body) {
    assert(!err, 'was success');
    done();
  });
});

dvr.describe('works', { mode: 'all' }, function() {
  it('makes request', function(done) {
    request('http://localhost:4000/users', function(err, res, body) {
      assert(!err, 'was success');
      done();
    });
  });
});
```

#### Global Configuration

A `dvr.config` method is exposed to set default configuration on a global level.
This should be done before any of your tests have run. In mocha you can put this
in a helper file.

```js
const dvr = require('nock-dvr');

dvr.config({
  excludeScope: ['github.com']
});
```

## Credit ##

* [Jake Craige](http://twitter.com/jakecraige)
