import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './handlers/auth.js'
import configRoutes from './handlers/config.js'
import orderRoutes from './handlers/orders.js'
import quoteRoutes from './handlers/quote.js'
import statusRoutes from './handlers/status.js'

const app = express()
const PORT = 3001

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())

app.use('/api', statusRoutes)
app.use('/api', configRoutes)
app.use('/api', authRoutes)
app.use('/api', quoteRoutes)
app.use('/api', orderRoutes)

app.listen(PORT, () => {
  console.log(`Mock Turbine API running on http://localhost:${PORT}/api`)
})
