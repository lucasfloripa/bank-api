import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'

// Dependency Injection
import { BillService } from '@services/Bill.service'
const {
  getBillAsync,
  getBillsAsync,
  deleteBillAsync
} = new BillService()

class BillController {
  // @desc      Get bills
  // @route     GET /api/v1/bills/
  // @route     GET /api/v1/users/:userId/bills
  getBills = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bills = await getBillsAsync(req.params.userId)

      if (!bills) {
        return next(new ErrorResponse('Bills not found', 404))
      }

      res.json({ sucess: true, count: bills?.length, bills })
    }
  );

  // @desc      Get single bill
  // @route     GET /api/v1/bills/:billId
  getBill = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bill = await getBillAsync(req.params.billId)

      if (!bill) {
        return next(new ErrorResponse('Bill not found', 404))
      }

      res.json({ sucess: true, bill })
    }
  );

  // @desc      Delete bill
  // @route     DELETE /api/v1/bills/:billId
  deleteBill = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bill = await deleteBillAsync(req.params.billId)

      if (!bill) {
        return next(new ErrorResponse('Bill not found', 404))
      }

      res.json({ sucess: true, bill: {} })
    }
  );
}

export { BillController }
