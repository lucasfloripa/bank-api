import express from 'express'
import { DebtController } from '@controllers/DebtController'
const { getDebts, getDebt, craeteDebt, updateDebt, deleteDebt } = new DebtController()

const debtRouter = express.Router({ mergeParams: true })

debtRouter.route('/')
  .get(getDebts)
  .post(craeteDebt)
debtRouter.route('/:debtId')
  .get(getDebt)
  .put(updateDebt)
  .delete(deleteDebt)

export { debtRouter }
