import { Box, Flex, Heading } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'

import { SwapForm } from '@features/swap/components/SwapForm'
import { TokenProvider } from '@features/tokens/providers/TokenProvider'
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
        <TokenProvider>
          <Flex direction="column" align="center" minH="100vh" pt={6} px={4}>
            <Flex
              justify="space-between"
              align="center"
              w="full"
              maxW="520px"
              mb={10}
            >
              <Heading
                size="md"
                fontWeight={600}
                letterSpacing="-0.02em"
                color="text.primary"
              >
                AquaFi
              </Heading>
              <ConnectWallet />
            </Flex>
            <SwapForm />
          </Flex>
        </TokenProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
