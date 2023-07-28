import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes'
import sequelize from './config/database'
import path from 'path'
import { notFoundHandler, errorHandler } from './middlewares/errorMiddleware'

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', (req: Request, res: Response) => {
  // Send the guide.html file from the "public" directory
  const filePath = path.join(__dirname, '..', 'public', 'index.html')
  res.sendFile(filePath)
})

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
