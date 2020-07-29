import express from 'express'
import debtRouter from '@routes/debtRouter'

// Dependecy Injectiopn
import UserController from '@controllers/userController'
const { getUsers, getUser, createUser, updateUser, deleteUser } = UserController

const router = express.Router()

// Re-route into other resource routers
router.use('/:userId/debts', debtRouter)

router.route('/')
  .get(getUsers)
  .post(createUser)
router.route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

export default router
