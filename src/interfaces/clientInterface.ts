import { IUserModel } from './userInterface'

export interface IClientModel extends IUserModel {
  debts: string[]
}
