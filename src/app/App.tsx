import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'

import { TokenModal } from '@features/tokens/components/TokenModal'
import { Account } from '@features/wallet/components/Account'
import { WalletOptions } from '@features/wallet/components/WalletOptions'

import { wagmiConfig } from './config'

const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <h1>AcquaFi</h1>
        <ConnectWallet />
        <TokenModal />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
