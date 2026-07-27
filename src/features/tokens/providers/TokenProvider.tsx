import { type ReactNode, createContext, useContext } from 'react'

import { useTurbineConfig } from '@shared/hooks/useTurbineConfig'
import type { Token } from '@shared/types'

import { mapToken } from '../services/tokenMapper'

interface TokenContextValue {
  tokens: Token[]
  isLoading: boolean
}

const TokenContext = createContext<TokenContextValue>({
  tokens: [],
  isLoading: true,
})

export function TokenProvider({ children }: { children: ReactNode }) {
  const { turbineConfig, isLoading } = useTurbineConfig()

  const turbineTokens = turbineConfig?.tokens ?? []
  const tokens = mapToken(turbineTokens)

  return (
    <TokenContext.Provider value={{ tokens, isLoading }}>
      {children}
    </TokenContext.Provider>
  )
}

export function useTokens() {
  return useContext(TokenContext)
}
