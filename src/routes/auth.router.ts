import express from 'express'

// Dependecy Injectiopn
import { AuthController } from '@controllers/Auth.controller'
const { login } = new AuthController()

const authRouter = express.Router()

authRouter.route('/login')
  .post(login)

export { authRouter }
