import { Router } from 'express'

import {
  createNonce,
  createSession,
  deleteSession,
  generateSessionId,
  getSession,
} from '../state.js'

const router = Router()

router.post('/nonce', (_req, res) => {
  const nonce = createNonce()
  const sessionId = generateSessionId()

  res.cookie('turbine_session', sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 300_000,
  })

  res.json({ nonce })
})

router.post('/verify', (req, res) => {
  const sessionId = req.cookies?.turbine_session
  if (!sessionId) {
    res.status(400).json({ error: 'No session cookie' })
    return
  }

  const { message, signature } = req.body
  if (!message || !signature) {
    res.status(400).json({ error: 'Missing message or signature' })
    return
  }

  // Accept any signature — extract address from SIWE message
  const addressMatch = message.match(/0x[a-fA-F0-9]{40}/)
  const address = addressMatch?.[0] ?? '0x0000000000000000000000000000000000000000'

  createSession(sessionId, address, `verified_${Date.now()}`)
  res.json({ ok: true })
})

// The SDK's getAuthStatus()/ensureAuthenticated() call this exact endpoint
// name ("me"), not "auth/status" — see turbine-sdk's turbineClient.ts.
router.get('/me', (req, res) => {
  const sessionId = req.cookies?.turbine_session
  const session = sessionId ? getSession(sessionId) : undefined

  if (session) {
    res.json({ authenticated: true, address: session.address })
  } else {
    res.status(401).json({ authenticated: false })
  }
})

router.post('/logout', (req, res) => {
  const sessionId = req.cookies?.turbine_session
  if (sessionId) {
    deleteSession(sessionId)
  }
  res.clearCookie('turbine_session')
  res.json({ ok: true })
})

export default router
