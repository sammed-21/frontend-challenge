import { useEffect, useState } from 'react'

import { turbineApiUrl } from '@app/config'

interface QuoteResult {
  ammSpreadHbp: number
  midPriceUsd: number
  estimatedOutput: string
  estimatedOutputUsd: number
}

export function useQuote(
  sellToken: string | undefined,
  buyToken: string | undefined,
  sellAmount: string,
) {
  const [quote, setQuote] = useState<QuoteResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!sellToken || !buyToken || !sellAmount || sellAmount === '0') {
      setQuote(null)
      return
    }

    setIsLoading(true)

    const fetchQuote = async () => {
      const res = await fetch(`${turbineApiUrl}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sell_token: sellToken,
          buy_token: buyToken,
          sell_amount: sellAmount,
        }),
      })

      if (!res.ok) return

      const data: QuoteResult = await res.json()
      setQuote(data)
      setIsLoading(false)
    }

    fetchQuote()

    const interval = setInterval(fetchQuote, 5000)
    return () => clearInterval(interval)
  }, [sellToken, buyToken, sellAmount])

  return { quote, isLoading }
}
