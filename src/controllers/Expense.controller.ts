import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'

// Dependency Injection
import { ExpenseService } from '@services/Expense.service'
import { IExpenseModel } from '@interfaces/expense.interface'
const {
  getExpensesAsync,
  getExpenseAsync,
  createExpenseAsync,
  updateExpenseAsync,
  deleteExpenseAsync
} = new ExpenseService()

class ExpenseController {
  // @desc      Get expenses
  // @route     GET /api/v1/expenses
  // @route     GET /api/v1/users/:userId/expenses
  getExpenses = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const expenses = await getExpensesAsync()

      if (!expenses) {
        return next(new ErrorResponse('Expenses not found', 404))
      }

      res.json({ success: true, count: expenses.length, expenses })
    }
  );

  // @desc      Get single expense
  // @route     GET /api/v1/expenses/:expenseId
  getExpense = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const expense = await getExpenseAsync(req.params.expenseId)

      if (!expense) {
        return next(new ErrorResponse('Expense not found', 404))
      }

      res.json({ success: true, expense })
    }
  );

  // @desc      Create expense
  // @route     POST /api/v1/expenses
  createExpense = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { clientId, title, description, value } = req.body as IExpenseModel

      const newExpense: IExpenseModel = { clientId, title, description, value }

      const expense = await createExpenseAsync(newExpense)

      if (!expense) {
        return next(new ErrorResponse('Expense not created', 500))
      }

      res.json({ success: true, expense })
    }
  );

  // @desc      Update expense
  // @route     PUT /api/v1/expenses/:expenseId
  updateExpense = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { clientId, title, description, value } = req.body as IExpenseModel

      const newExpense: IExpenseModel = { clientId, title, description, value }

      const expense = await updateExpenseAsync(req.params.expenseId, newExpense)

      if (!expense) {
        return next(new ErrorResponse('Expense not found', 404))
      }

      res.json({ success: true, expense })
    }
  );

  // @desc      Delete expense
  // @route     DELETE /api/v1/expenses/:expenseId
  deleteExpense = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const expense = await deleteExpenseAsync(req.params.expenseId)

      if (!expense) {
        return next(new ErrorResponse('Expense not found', 404))
      }

      res.json({ success: true, expense: {} })
    }
  );
}

export { ExpenseController }
