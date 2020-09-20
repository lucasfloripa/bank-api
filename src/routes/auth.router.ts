import express from 'express'
import { protect } from '@middlewares/auth'

// Dependecy Injectiopn
import { AuthController } from '@controllers/Auth.controller'
const { login, logout, getMe } = new AuthController()

const authRouter = express.Router()

authRouter.route('/login').post(login)
authRouter.route('/logout').post(logout)
authRouter.route('/me').get(protect, getMe)

export { authRouter }
