import { strictEquals } from 'node:assert'
import { describe, it } from 'node:test'
import { sayHello } from '@/lib/say-hello'

describe('say-hello', () => {
  it('says hello with default arg value', () => {
    strictEquals(sayHello(), 'Hello, World!')
  })

  it('says hello with specified arg value', () => {
    strictEquals(sayHello('Node.js'), 'Hello, Node.js!')
  })
})
