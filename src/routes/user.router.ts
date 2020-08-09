import express from 'express'
import { debtRouter } from '@routes/debt.router'

// Dependecy Injectiopn
import { UserController } from '@controllers/User.controller'
const { getUsers, getUser, deleteUser } = new UserController()

const userRouter = express.Router()

// Re-route into other resource routers
userRouter.use('/:userId/debts', debtRouter)

userRouter.route('/')
  .get(getUsers)
userRouter.route('/:userId')
  .get(getUser)
  .delete(deleteUser)

export { userRouter }
