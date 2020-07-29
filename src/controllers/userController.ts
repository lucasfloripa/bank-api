import { Request, Response, NextFunction } from 'express'
import asyncHandler from '@middlewares/asyncHandler'
import ErrorResponse from '@utils/ErrorResponse'

// Dependency Injection
import userService from '@services/userService'
const { getUsersAsync, getUserAsync, createUserAsync, updateUserAsync, deleteUserAsync } = userService

class UserController {
  // @desc      Get users
  // @route     GET /api/v1/users
  public getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const users = await getUsersAsync()

    if (!users) {
      return next(new ErrorResponse('Users not found', 404))
    }

    res.json({ success: true, count: users.length, users })
  })

  // @desc      Get single user
  // @route     GET /api/v1/users/:userId
  public getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserAsync(req.params.userId)

    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }

    res.json({ success: true, user })
  })

  // @desc      Create user
  // @route     POST /api/v1/users
  public createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUserAsync(req.body)

    if (!user) {
      return next(new ErrorResponse('User not created', 500))
    }

    res.json({ success: true, user })
  })

  // @desc      Update user
  // @route     PUT /api/v1/users/:userId
  public updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await updateUserAsync(req.params.userId, req.body)

    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }

    res.json({ success: true, user })
  })

  // @desc      Delete user
  // @route     DELETE /api/v1/users/:userId
  public deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await deleteUserAsync(req.params.userId)

    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }

    res.json({ success: true, user: {} })
  })
}

export default new UserController()
