import { Document, Schema, Types, Model, model } from 'mongoose'
import { Bill } from '@models/bill.module'
import { IDebtModel } from '@interfaces/debt.interface'

export interface DebtModel extends IDebtModel, Document {}

Bill.discriminator(
  'Debt',
  new Schema({
    bankerId: {
      type: Types.ObjectId,
      ref: 'Banker'
    }
  })
)

const Debt: Model<DebtModel> = model<DebtModel>('Debt')

export { Debt }
