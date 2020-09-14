import { Request } from 'express'
import { IUserModel } from './user.interface'

export interface IAuthLogin {
  enteredEmail: string
  enteredPassword: string
}

export interface IUserTokenDecoded {
  id: string
}

export interface IGetUserAuthInfoRequest extends Request {
  user: IUserModel
}
