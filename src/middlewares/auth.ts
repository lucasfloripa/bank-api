import { Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'
import jwt from 'jsonwebtoken'
import { IGetUserAuthInfoRequest, IUserTokenDecoded } from '@interfaces/auth.interface'
import { UserService } from '@services/User.service'
const { getUserAsync } = new UserService()

const protect = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  let token: string

  if (authorization?.startsWith('Bearer')) {
    token = authorization.split(' ')[1]
  }

  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await getUserAsync((decoded as IUserTokenDecoded).id)

    req.userId = user._id

    next()
  } catch (error) {
    return next(new ErrorResponse('Not authorize to access this route', 401))
  }
})

const authorize = (...userTypes) => {
  return async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = await getUserAsync(req.userId)

    if (!userTypes.includes(user.userType)) {
      return next(new ErrorResponse(`User role ${user.userType} is not authorized to access this route`, 403))
    }
    next()
  }
}

export { protect, authorize }
