const importJSX = require('@isaacs/import-jsx')
const React = require('react')
const Log = importJSX('./log.js')
const t = require('tap')
const {render} = require('ink-testing-library')

const r = render(<Log log={[
  {raw: 'hello'},
  {result: {ok: true, name: 'this is fine', testName: 'foo'}},
  {result: {ok: false, name: 'not fine', testName: 'bar'}},
]} />)

t.matchSnapshot(r.lastFrame())
