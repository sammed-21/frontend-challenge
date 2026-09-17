import { formatUnits, parseUnits } from 'viem'

// Matches viem's own decimal validation (Value.from), so a value that passes
// here is guaranteed not to throw in toOnchainAmount. Rejects the lone "."
// or empty string that the input's typing-state regex otherwise allows.
const VALID_AMOUNT = /^(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/

export function isValidAmount(value: string): boolean {
  return VALID_AMOUNT.test(value) && parseFloat(value) > 0
}

export function toOnchainAmount(value: string, decimals: number): bigint {
  return parseUnits(value, decimals)
}

export function fromOnchainAmount(value: bigint, decimals: number): string {
  return formatUnits(value, decimals)
}
