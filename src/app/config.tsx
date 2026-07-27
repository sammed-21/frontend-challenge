import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = 'e37d4536b2880138a1e54395da26e243'

export const turbineApiUrl: string =
  import.meta.env.VITE_TURBINE_API_URL || 'http://localhost:3001/api'

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
  },
})
