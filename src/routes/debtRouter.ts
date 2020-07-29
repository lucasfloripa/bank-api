import express from 'express'
import DebtController from '@controllers/debtController'
const { getDebts, getDebt, craeteDebt, updateDebt, deleteDebt } = DebtController

const router = express.Router({ mergeParams: true })

router.route('/')
  .get(getDebts)
  .post(craeteDebt)
router.route('/:debtId')
  .get(getDebt)
  .put(updateDebt)
  .delete(deleteDebt)

export default router
