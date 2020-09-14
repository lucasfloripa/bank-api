import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'
import { IAuthLogin, IGetUserAuthInfoRequest } from '@interfaces/auth.interface'

// Dependency Injection
import { AuthService } from '@services/Auth.service'
import { UserService } from '@services/User.service'
const { loginAsync } = new AuthService()
const { getUserAsync } = new UserService()

class AuthController {
  // @desc      Login
  // @route     GET /api/v1/auth/login
  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body as IAuthLogin

      if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400))
      }

      const auth = await loginAsync(email)

      if (!auth) {
        return next(new ErrorResponse('Invalid credencials', 401))
      }

      const isMatch = await auth.matchPassword(password, auth.password)

      if (!isMatch) {
        return next(new ErrorResponse('Invalid password', 401))
      }

      const token = await auth.getSignedJwtToken(auth._id)

      res.status(200).json({ success: true, token })
    }
  )

  // @desc      Get current user
  // @route     GET /api/v1/auth/me
  getMe = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = await getUserAsync(req.userId)

    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }

    res.status(200).json({ success: true, user })
  })
}

export { AuthController }
