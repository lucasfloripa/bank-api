import express from 'express'
import { protect } from '@middlewares/auth'

// Dependecy Injection
import { DebtController } from '@controllers/Debt.controller'
const { getDebts, getDebt, createDebt, updateDebt, deleteDebt } = new DebtController()

const debtRouter = express.Router({ mergeParams: true })

debtRouter.route('/')
  .get(protect, getDebts)
  .post(createDebt)
debtRouter.route('/:debtId')
  .get(protect, getDebt)
  .put(protect, updateDebt)
  .delete(protect, deleteDebt)

export { debtRouter }
