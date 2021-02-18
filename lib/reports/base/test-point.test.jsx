const React = require('react')
const t = require('tap')
const importJSX = require('import-jsx')
const TestPoint = importJSX('./test-point.js')
const {render} = require('ink-testing-library')

const r = render(<div />)

process.env.TAP_BAIL = '0'
const test = new t.Test()
test.name = 'some name'
test.parser.on('assert', res => {
  res.testName = test.name
  res.diag && res.diag.stack && (res.diag.stack = '{stack}')
  r.rerender(<TestPoint res={res} />)
  t.matchSnapshot(r.lastFrame(), res.name)
})

test.pass('this is fine')
test.fail('not so fine')
test.match({a: 1}, {a: Function}, 'no match')
test.test('test without fn is a todo')
test.test('todo test with named reason', { todo: 'i have my reasons' })
const er = new Error('this is an error')
// polyfill until tap publishes the origin-tracking feature
const s = er.stack // trigger the getter
const cleanYamlObject = require('tap/lib/clean-yaml-object.js')
const extraFromError = require('tap/lib/extra-from-error.js')
const extra = { origin: cleanYamlObject(extraFromError(er)) }
test.error(er, 'to er is to fail this assertion', extra)
test.equal(1, 2)
test.same({a: 1}, {b: 2})
test.fail('magma', { skip: 'hop over the lava' })
test.fail('rope', { skip: true })
test.resume()
