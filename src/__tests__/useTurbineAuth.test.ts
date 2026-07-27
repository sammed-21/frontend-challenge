import { describe, expect, it, vi } from 'vitest'

// Mock shape is outdated — missing getAuthStatus method
// that the current SDK version exports. One test fails.
const mockClient = {
  authenticate: vi.fn().mockResolvedValue(undefined),
  addOrder: vi.fn(),
  getOrderStates: vi.fn(),
}

describe('useTurbineAuth', () => {
  it('should expose the client when available', () => {
    expect(mockClient.authenticate).toBeDefined()
  })

  it('should have getAuthStatus method', () => {
    expect(mockClient).toHaveProperty('getAuthStatus')
  })
})
