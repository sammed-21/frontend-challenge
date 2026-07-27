import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { TurbineClient } from 'turbine-sdk'
import { usePublicClient, useWalletClient } from 'wagmi'

import { turbineApiUrl } from '@app/config'

interface TurbineContextValue {
  client: TurbineClient | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const TurbineContext = createContext<TurbineContextValue>({
  client: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
})

export function TurbineProvider({ children }: { children: ReactNode }) {
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const [client, setClient] = useState<TurbineClient | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Create client + authenticate when wallet connects
  useEffect(() => {
    if (!walletClient || !publicClient) {
      setClient(null)
      setIsAuthenticated(false)
      return
    }

    let cancelled = false

    async function init() {
      setIsLoading(true)
      setError(null)
      try {
        const turbineClient = await TurbineClient.create(
          walletClient!,
          publicClient!,
          turbineApiUrl,
        )
        await turbineClient.authenticate()

        if (!cancelled) {
          setClient(turbineClient)
          setIsAuthenticated(true)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Authentication failed')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    init()
    return () => {
      cancelled = true
    }
  }, [walletClient, publicClient])

  return (
    <TurbineContext.Provider
      value={{ client, isAuthenticated, isLoading, error }}
    >
      {children}
    </TurbineContext.Provider>
  )
}

export function useTurbine() {
  return useContext(TurbineContext)
}
