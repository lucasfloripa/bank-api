import { IBillModel } from './bill.interface'

export interface IExpenseModel extends IBillModel {
  type: string
}
