import type { Request, Response, NextFunction } from 'express'
import { Router } from 'express'

import { addOrder, generateOrderHash, getOrder, getSession } from '../state.js'

const router = Router()

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies?.turbine_session
  const session = sessionId ? getSession(sessionId) : undefined

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  ;(req as any).userAddress = session.address
  next()
}

router.post('/add_order', requireAuth, (req, res) => {
  const hash = generateOrderHash()

  addOrder({
    hash,
    status: 'Active',
    sellToken: req.body?.order?.sellToken ?? '',
    buyToken: req.body?.order?.buyToken ?? '',
    sellAmount: req.body?.order?.sellAmount?.toString() ?? '0',
    createdAt: Date.now(),
  })

  res.json({ orderHash: hash })
})

router.post('/order_states', requireAuth, (req, res) => {
  const { orderHashes } = req.body

  const states = (orderHashes ?? []).map((hash: string) => {
    const order = getOrder(hash)
    return {
      hash,
      status: order?.status ?? 'Active',
      execution: [],
      executedSellAmount: '0',
      executedBuyAmount: '0',
    }
  })

  res.json(states)
})

export default router
