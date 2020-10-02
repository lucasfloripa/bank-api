import { Document, Schema, Types, Model, model } from 'mongoose'
import { Bill } from '@models/bill.module'
import { IExpenseModel } from '@interfaces/expense.interface'

export interface ExpenseModel extends IExpenseModel, Document {}

Bill.discriminator(
  'Expense',
  new Schema({
    debts: [{ type: Types.ObjectId, ref: 'Debt' }]
  })
)

const Expense: Model<ExpenseModel> = model<ExpenseModel>('Expense')

export { Expense }
