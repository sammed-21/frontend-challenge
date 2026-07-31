import { Router } from 'express'

const router = Router()

const MOCK_PRICES: Record<string, number> = {
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': 3200,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 1,
  '0xdac17f958d2ee523a2206206994597c13d831ec7': 1,
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': 62000,
  '0x6b175474e89094c44da98b954eedeac495271d0f': 1,
  '0x514910771af9ca656af840dff83e8264ecf986ca': 14,
  '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984': 7.5,
  '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9': 95,
  '0x6982508145454ce325ddbe47a25d4ec3d2311933': 0.000012,
  '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce': 0.000025,
}

router.post('/quote', (req, res) => {
  const { sell_token, buy_token, sell_amount } = req.body

  const sellPrice = MOCK_PRICES[sell_token?.toLowerCase()] ?? 1
  const buyPrice = MOCK_PRICES[buy_token?.toLowerCase()] ?? 1

  const sellAmountNum = parseFloat(sell_amount) || 0
  const rate = sellPrice / buyPrice
  const estimatedOutput = (sellAmountNum * rate).toFixed(6)
  const estimatedOutputUsd = sellAmountNum * sellPrice

  const ammSpreadHbp = 800 + Math.floor(Math.random() * 400)

  const delay = 200 + Math.floor(Math.random() * 800)
  setTimeout(() => {
    res.json({
      ammSpreadHbp,
      midPriceUsd: sellPrice,
      estimatedOutput,
      estimatedOutputUsd,
    })
  }, delay)
})

export default router
