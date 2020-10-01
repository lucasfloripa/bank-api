import express from 'express'
import { protect, authorize } from '@middlewares/auth'

// Dependecy Injection
import { DebtController } from '@controllers/Debt.controller'
const { getDebts, getDebt, createDebt, updateDebt, deleteDebt } = new DebtController()

const debtRouter = express.Router({ mergeParams: true })

debtRouter.route('/')
  .get(protect, authorize('Client', 'Banker', 'Admin'), getDebts)
  .post(protect, authorize('Client', 'Banker'), createDebt)
debtRouter.route('/:debtId')
  .get(protect, authorize('Client', 'Banker', 'Admin'), getDebt)
  .put(protect, authorize('Client', 'Banker', 'Admin'), updateDebt)
  .delete(protect, authorize('Client', 'Banker'), deleteDebt)

export { debtRouter }
