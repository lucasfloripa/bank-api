import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'

// Dependency Injection
import { AuthService } from '@services/Auth.service'
import { IAuthLogin } from '@interfaces/auth.interface'
const { loginAsync } = new AuthService()

class AuthController {
  // @desc      Login
  // @route     GET /api/v1/auth/login
  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { enteredEmail, enteredPassword } = req.body as IAuthLogin

      if (!enteredEmail || !enteredPassword) {
        return next(new ErrorResponse('Please provide an email and password', 400))
      }

      const auth = await loginAsync(enteredEmail)

      if (!auth) {
        return next(new ErrorResponse('Invalid credencials', 401))
      }

      const isMatch = await auth.matchPassword(enteredPassword, auth.password)

      if (!isMatch) {
        return next(new ErrorResponse('Invalid password', 401))
      }

      const token = await auth.getSignedJwtToken()

      res.status(200).json({ success: true, token })
    }
  )
}

export { AuthController }
