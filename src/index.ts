import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes'
import sequelize from './config/database'
import { notFoundHandler, errorHandler } from './middlewares/errorMiddleware'

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/api', userRoutes)

// Error handling middleware
app.use(notFoundHandler)
app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 3000

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })
