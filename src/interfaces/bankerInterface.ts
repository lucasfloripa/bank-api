import { IUserModel } from './userInterface'

export interface IBankerModel extends IUserModel {
  bank: string
}
