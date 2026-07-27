import { useEffect, useState } from 'react'

import type { TurbineError } from '@shared/services/turbine/errors'
import type { TurbineConfig } from '@shared/services/turbine/types'

import { turbineApiUrl } from '@app/config'

export function useTurbineConfig() {
  const [turbineConfig, setTurbineConfig] = useState<TurbineConfig | undefined>(
    undefined,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<TurbineError | undefined>(undefined)
  const [retryCount, setRetryCount] = useState<number>(0)

  useEffect(() => {
    const loadConfig = async () => {
      setIsLoading(true)
      setError(undefined)
      try {
        const res = await fetch(`${turbineApiUrl}/config`)
        if (!res.ok) throw new Error(`Config fetch failed: ${res.status}`)
        const config: TurbineConfig = await res.json()
        setTurbineConfig(config)

        setRetryCount(0)
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadConfig()
  }, [retryCount])

  useEffect(() => {
    if (!error) return

    const retryTimer = setTimeout(() => {
      console.log(`Error loading turbine config`)
      setRetryCount((prev) => prev + 1)
    }, 30000)

    return () => clearTimeout(retryTimer)
  }, [error])

  return { turbineConfig, isLoading, error }
}
