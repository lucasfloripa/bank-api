import express from 'express'
import { protect } from '@middlewares/auth'

// Dependecy Injection
import { BillController } from '@controllers/Bill.controller'
const { getBills, getBill, deleteBill } = new BillController()

const billRouter = express.Router({ mergeParams: true })

billRouter.route('/').get(protect, getBills)
billRouter.route('/:billId').get(protect, getBill).delete(protect, deleteBill)

export { billRouter }
