const { test, describe } = require('node:test')
const assert = require('node:assert')

const { reverse } = require('../utils/for_testing')

describe('reverse', () => {
  test('of a', () => {
    assert.strictEqual(reverse('a'), 'a')
  })

  test('of react', () => {
    assert.strictEqual(reverse('react'), 'tcaer')
  })

  test('of saippuakauppias', () => {
    assert.strictEqual(reverse('saippuakauppias'), 'saippuakauppias')
  })
})
