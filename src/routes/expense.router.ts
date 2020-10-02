import express from 'express'
import { protect } from '@middlewares/auth'

// Dependecy Injectiopn
import { ExpenseController } from '@controllers/Expense.controller'
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense
} = new ExpenseController()

const expenseRouter = express.Router({ mergeParams: true })

expenseRouter.route('/').get(protect, getExpenses).post(createExpense)
expenseRouter
  .route('/:expenseId')
  .get(protect, getExpense)
  .put(protect, updateExpense)
  .delete(protect, deleteExpense)

export { expenseRouter }
