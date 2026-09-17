import { describe, expect, it } from 'vitest'

import { fromOnchainAmount, isValidAmount, toOnchainAmount } from './amount'

describe('toOnchainAmount / fromOnchainAmount', () => {
  it('round-trips a simple value', () => {
    const wei = toOnchainAmount('1.5', 18)
    expect(wei).toBe(1_500_000_000_000_000_000n)
    expect(fromOnchainAmount(wei, 18)).toBe('1.5')
  })

  it('preserves full 18-decimal precision', () => {
    // The old parseFloat/Math.round implementation loses precision here
    // because 0.123456789012345678 is not exactly representable as a float.
    const wei = toOnchainAmount('0.123456789012345678', 18)
    expect(wei).toBe(123_456_789_012_345_678n)
  })

  it('handles whole numbers with low-decimal tokens (e.g. USDC)', () => {
    expect(toOnchainAmount('100', 6)).toBe(100_000_000n)
  })

  it('handles a large amount that would overflow Number precision', () => {
    const wei = toOnchainAmount('123456789.123456789012345678', 18)
    expect(fromOnchainAmount(wei, 18)).toBe('123456789.123456789012345678')
  })

  it('handles leading-dot input produced while typing', () => {
    expect(toOnchainAmount('.5', 18)).toBe(500_000_000_000_000_000n)
  })

  it('handles trailing-dot input produced while typing', () => {
    expect(toOnchainAmount('5.', 18)).toBe(5_000_000_000_000_000_000n)
  })
})

describe('isValidAmount', () => {
  it('accepts normal decimal values', () => {
    expect(isValidAmount('1.5')).toBe(true)
    expect(isValidAmount('100')).toBe(true)
    expect(isValidAmount('.5')).toBe(true)
    expect(isValidAmount('5.')).toBe(true)
  })

  it('rejects a lone dot', () => {
    expect(isValidAmount('.')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidAmount('')).toBe(false)
  })

  it('rejects zero', () => {
    expect(isValidAmount('0')).toBe(false)
    expect(isValidAmount('0.0')).toBe(false)
  })
})
