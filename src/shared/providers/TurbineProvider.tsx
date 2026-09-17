import {
  type ReactNode,
  createContext,
  useCallback,
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
  retryAuth: () => void
}

const TurbineContext = createContext<TurbineContextValue>({
  client: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  retryAuth: () => {},
})

export function TurbineProvider({ children }: { children: ReactNode }) {
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const [client, setClient] = useState<TurbineClient | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryToken, setRetryToken] = useState(0)

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

        // ensureAuthenticated() reuses an existing, still-valid session
        // (checks /me first) instead of forcing a wallet signature on every
        // mount, and retries authentication once if the session is gone.
        await turbineClient.ensureAuthenticated()

        if (!cancelled) {
          setClient(turbineClient)
          setIsAuthenticated(true)
        }
      } catch (err) {
        if (!cancelled) {
          setClient(null)
          setIsAuthenticated(false)
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
  }, [walletClient, publicClient, retryToken])

  // The mock/real session can expire server-side (e.g. idle tab) without the
  // client ever finding out. Revalidate when the tab regains focus so the UI
  // doesn't keep claiming the user is authenticated when they no longer are;
  // the next action that needs auth will re-prompt via ensureAuthenticated().
  useEffect(() => {
    if (!client) return

    function revalidate() {
      client!.getAuthStatus().then((status) => {
        setIsAuthenticated(status.authenticated)
      })
    }

    window.addEventListener('focus', revalidate)
    return () => window.removeEventListener('focus', revalidate)
  }, [client])

  const retryAuth = useCallback(() => setRetryToken((n) => n + 1), [])

  return (
    <TurbineContext.Provider
      value={{ client, isAuthenticated, isLoading, error, retryAuth }}
    >
      {children}
    </TurbineContext.Provider>
  )
}

export function useTurbine() {
  return useContext(TurbineContext)
}
