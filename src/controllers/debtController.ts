import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'

// Interfaces
import { IDebtModel } from '@interfaces/debtInterface'

// Dependency Injection
import { DebtService } from '@services/DebtService'
const { getDebtAsync, getDebtsAsync, createDebtAsync, updateDebtAsync, deleteDebtAsync, pushNewDebtToClient } = new DebtService()

class DebtController {
  // @desc      Get debts
  // @route     GET /api/v1/debts/
  // @route     GET /api/v1/users/:userId/debts
  public getDebts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const debts = await getDebtsAsync(req.params.userId)

    if (!debts) {
      return next(new ErrorResponse('Debts not found', 404))
    }

    res.json({ sucess: true, count: debts?.length, debts })
  })

  // @desc      Get single debt
  // @route     GET /api/v1/debts/:debtId
  public getDebt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const debt = await getDebtAsync(req.params.debtId)

    if (!debt) {
      return next(new ErrorResponse('Debt not found', 404))
    }

    res.json({ sucess: true, debt })
  })

  // @desc      Create debt
  // @route     POST /api/v1/debts/
  public craeteDebt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { clientId, bankerId, reason, value } = req.body as IDebtModel

    const newDebt: IDebtModel = { clientId, bankerId, reason, value }

    const debt = await createDebtAsync(newDebt)

    if (!debt) {
      return next(new ErrorResponse('Debts not created', 500))
    }

    const client = await pushNewDebtToClient(clientId, debt._id)

    if (!client) {
      return next(new ErrorResponse('Client not found', 500))
    }

    res.json({ sucess: true, debt, client })
  })

  // @desc      Update debt
  // @route     PUT /api/v1/debts/:debtId
  public updateDebt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { clientId, bankerId, reason, value } = req.body as IDebtModel

    const updateDebt: IDebtModel = { clientId, bankerId, reason, value }

    const debt = await updateDebtAsync(req.params.debtId, updateDebt)

    if (!debt) {
      return next(new ErrorResponse('Debt not found', 404))
    }

    res.json({ sucess: true, debt })
  })

  // @desc      Delete debt
  // @route     DELETE /api/v1/debts/:debtId
  public deleteDebt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const debt = await deleteDebtAsync(req.params.debtId)

    if (!debt) {
      return next(new ErrorResponse('Debt not found', 404))
    }

    res.json({ sucess: true, debt: {} })
  })
}

export { DebtController }
