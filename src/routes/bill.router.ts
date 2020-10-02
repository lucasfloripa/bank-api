import express from 'express'
import { protect, authorize } from '@middlewares/auth'

// Dependecy Injection
import { BillController } from '@controllers/Bill.controller'
const { getBills, getBill, deleteBill } = new BillController()

const billRouter = express.Router({ mergeParams: true })

billRouter.route('/')
  .get(protect, authorize('Client', 'Banker', 'Admin'), getBills)
billRouter.route('/:billId')
  .get(protect, authorize('Client', 'Banker', 'Admin'), getBill)
  .delete(protect, authorize('Client', 'Banker'), deleteBill)

export { billRouter }
