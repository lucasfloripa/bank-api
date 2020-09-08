import { IUserModel } from './user.interface'

export interface IClientModel extends IUserModel {
  debts?: string[]
}
