import express from 'express'
import { protect, authorize } from '@middlewares/auth'

// Dependecy Injectiopn
import { ExpenseController } from '@controllers/Expense.controller'
const { getExpenses, getExpense, createExpense, updateExpense, deleteExpense } = new ExpenseController()

const expenseRouter = express.Router({ mergeParams: true })

expenseRouter.route('/')
  .get(protect, authorize('Banker', 'Admin'), getExpenses)
  .post(createExpense)
expenseRouter.route('/:expenseId')
  .get(protect, authorize('Banker', 'Admin'), getExpense)
  .put(protect, authorize('Expense', 'Admin'), updateExpense)
  .delete(protect, authorize('Expense', 'Admin'), deleteExpense)

export { expenseRouter }
