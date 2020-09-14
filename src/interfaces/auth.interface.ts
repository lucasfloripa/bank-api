import { Request } from 'express'

export interface IAuthLogin {
  email: string
  password: string
}

export interface IUserTokenDecoded {
  id: string
}

export interface IGetUserAuthInfoRequest extends Request {
  userId: string
}
