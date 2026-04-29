import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// ✅ ROUTES
app.use('/api/auth', authRoutes)

// ✅ TEST
app.get('/', (req, res) => {
  res.send('Backend Running 🚀')
})

// ✅ DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})