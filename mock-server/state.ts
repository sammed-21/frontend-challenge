import { randomUUID } from 'crypto'

interface Session {
  address: string
  nonce: string
  createdAt: number
}

interface MockOrder {
  hash: string
  status: string
  sellToken: string
  buyToken: string
  sellAmount: string
  createdAt: number
}

const sessions = new Map<string, Session>()
const orders = new Map<string, MockOrder>()

const SESSION_TTL_MS = 300_000 // 5 minutes

let nonceCounter = 0

export function createNonce(): string {
  nonceCounter++
  return `nonce_${nonceCounter}_${Date.now()}`
}

export function createSession(
  sessionId: string,
  address: string,
  nonce: string,
) {
  sessions.set(sessionId, { address, nonce, createdAt: Date.now() })
}

export function getSession(sessionId: string): Session | undefined {
  const session = sessions.get(sessionId)
  if (!session) return undefined

  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(sessionId)
    return undefined
  }
  return session
}

export function addOrder(order: MockOrder) {
  orders.set(order.hash, order)
}

export function getOrder(hash: string): MockOrder | undefined {
  return orders.get(hash)
}

export function getAllOrders(): MockOrder[] {
  return Array.from(orders.values())
}

export function generateOrderHash(): string {
  return `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join('')}`
}

export function generateSessionId(): string {
  return randomUUID()
}
