import { createContext, useContext } from 'react'

import { useTurbineConfig } from '@shared/hooks/useTurbineConfig'
import type { Token } from '@shared/types'

import { mapToken } from '../services/tokenMapper'

const TokenContext = createContext<Token[]>([])

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const { turbineConfig } = useTurbineConfig()
  const tokens = turbineConfig?.tokens

  const mappedTokens = mapToken(tokens ?? [])

  return (
    <TokenContext.Provider value={mappedTokens}>
      {children}
    </TokenContext.Provider>
  )
}

export function useTokens() {
  return useContext(TokenContext)
}
