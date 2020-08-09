import express from 'express'
import { DebtController } from '@controllers/Debt.controller'
const { getDebts, getDebt, createDebt, updateDebt, deleteDebt } = new DebtController()

const debtRouter = express.Router({ mergeParams: true })

debtRouter.route('/')
  .get(getDebts)
  .post(createDebt)
debtRouter.route('/:debtId')
  .get(getDebt)
  .put(updateDebt)
  .delete(deleteDebt)

export { debtRouter }
