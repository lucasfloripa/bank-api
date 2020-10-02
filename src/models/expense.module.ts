import { Document, Schema, Model, model } from 'mongoose'
import { Bill } from '@models/bill.module'
import { IExpenseModel } from '@interfaces/expense.interface'

export interface ExpenseModel extends IExpenseModel, Document {}

Bill.discriminator(
  'Expense',
  new Schema({
    type: [{ type: String, required: true }]
  })
)

const Expense: Model<ExpenseModel> = model<ExpenseModel>('Expense')

export { Expense }
