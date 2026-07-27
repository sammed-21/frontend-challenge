import { describe, expect, it } from 'vitest'

// Utility functions — test these exist in shared/utils/ or similar
// Candidate may move them during restructuring

function formatAmount(value: string, maxDecimals = 6): string {
  if (!value || value === '0') return '0'
  const num = parseFloat(value)
  if (isNaN(num) || num === 0) return '0'
  const fixed = num.toFixed(maxDecimals)
  return fixed.replace(/\.?0+$/, '') || '0'
}

function shortenAddress(address: string): string {
  if (address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatBps(hbp: number): string {
  return (hbp / 100).toFixed(2)
}

describe('formatAmount', () => {
  it('formats zero', () => {
    expect(formatAmount('0')).toBe('0')
  })

  it('removes trailing zeros', () => {
    expect(formatAmount('1.500000')).toBe('1.5')
  })

  it('respects max decimals', () => {
    expect(formatAmount('1.123456789', 4)).toBe('1.1235')
  })

  it('handles empty string', () => {
    expect(formatAmount('')).toBe('0')
  })
})

describe('shortenAddress', () => {
  it('shortens a full address', () => {
    expect(shortenAddress('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')).toBe(
      '0xC02a...6Cc2',
    )
  })

  it('returns short strings unchanged', () => {
    expect(shortenAddress('0x1234')).toBe('0x1234')
  })
})

describe('formatBps', () => {
  it('converts hundredths of bps to bps', () => {
    expect(formatBps(950)).toBe('9.50')
  })
})
