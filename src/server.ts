import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { AppError } from './errors/AppError'
import { routes } from './routes/index'

const app = express()

process.on('uncaughtException', err => {
  console.log(err)
  process.exit(1)
})

process.on('SIGTERM', () => {
  process.exit()
})

app.use(cors())
app.use(express.json())

app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'Error',
    message: `Internal server error - ${err.message}`
  })
})

app.listen(3333)
