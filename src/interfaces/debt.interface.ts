import { IBillModel } from './bill.interface'

export interface IDebtModel extends IBillModel {
  bankerId: string
}
