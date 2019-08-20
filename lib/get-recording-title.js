
const path = require('path')
const slug = require('slug')

module.exports = testCtx => {
  const cassettePath = []

  let parent = testCtx.test.parent
  if (parent) {
    while (parent.title) {
      cassettePath.unshift(parent.title)
      parent = parent.parent
    }
  }
  cassettePath.push((testCtx.currentTest || testCtx.test).title)

  return path.join.apply(path,
    cassettePath.map(pathPiece => slug(pathPiece).toLowerCase())
  )
}
