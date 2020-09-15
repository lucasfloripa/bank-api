import express from 'express'
import { protect, authorize } from '@middlewares/auth'
import { debtRouter } from '@routes/debt.router'

// Dependecy Injection
import { UserController } from '@controllers/User.controller'
const { getUsers, getUser, deleteUser } = new UserController()

const userRouter = express.Router()

// Re-route into other resource routers
userRouter.use('/:userId/debts', debtRouter)

userRouter.route('/')
  .get(protect, authorize('Admin'), getUsers)
userRouter.route('/:userId')
  .get(protect, authorize('Admin'), getUser)
  .delete(protect, authorize('Admin'), deleteUser)

export { userRouter }
