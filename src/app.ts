import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { connectDB } from './config/database'
import { userRouter } from '@routes/user.router'
import { clientRouter } from '@routes/client.router'
import { debtRouter } from '@routes/debt.router'
import { bankerRouter } from '@routes/banker.router'

class App {
  public express: express.Application

  public constructor () {
    dotenv.config({ path: './src/config/config.env' })
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(cors())
    if (process.env.NODE_ENV === 'development') {
      this.express.use(morgan('dev'))
    }
  }

  private database (): void {
    connectDB()
  }

  private routes (): void {
    this.express.use('/api/v1/users', userRouter)
    this.express.use('/api/v1/clients', clientRouter)
    this.express.use('/api/v1/debts', debtRouter)
    this.express.use('/api/v1/bankers', bankerRouter)
  }
}

export { App }
