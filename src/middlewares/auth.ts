import { Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'
import jwt from 'jsonwebtoken'
import { User } from '@models/user.module'
import { IGetUserAuthInfoRequest, IUserTokenDecoded } from '@interfaces/auth.interface'

const protect = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  let token: string

  if (authorization?.startsWith('Beared')) {
    token = authorization.split(' ')[1]
  }

  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById((decoded as IUserTokenDecoded).id)

    next()
  } catch (error) {
    return next(new ErrorResponse('Not authorize to access this route', 401))
  }
})

export { protect }
