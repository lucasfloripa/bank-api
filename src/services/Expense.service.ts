import { Expense } from '@models/expense.module'
import { IExpenseModel } from '@interfaces/expense.interface'

class ExpenseService {
  getExpenseAsync = async (expenseId: string) => {
    const expense = await Expense.findById(expenseId)

    return expense
  };

  getExpensesAsync = async () => {
    const expenses = await Expense.find()

    return expenses
  };

  createExpenseAsync = async (newExpense: IExpenseModel) => {
    const expense = await Expense.create(newExpense)

    return expense
  };

  updateExpenseAsync = async (expenseId: string, updatedExpense: IExpenseModel) => {
    let expense = await Expense.findById(expenseId)

    if (expense) {
      expense = await Expense.findByIdAndUpdate(expenseId, updatedExpense, {
        new: true,
        runValidators: true
      })
    }

    return expense
  };

  deleteExpenseAsync = async (expenseId: string) => {
    const expense = await Expense.findById(expenseId)

    return await expense.remove()
  };
}

export { ExpenseService }
