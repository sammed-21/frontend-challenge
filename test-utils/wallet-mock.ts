import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

// Hardhat account #0 — well-known test private key. Never use with real funds.
const TEST_PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

export const testAccount = privateKeyToAccount(TEST_PRIVATE_KEY)

export const testWalletClient = createWalletClient({
  account: testAccount,
  chain: mainnet,
  transport: http(),
})
