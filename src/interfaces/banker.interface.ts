import { IUserModel } from './user.interface'

export interface IBankerModel extends IUserModel {
  bank: string
}
