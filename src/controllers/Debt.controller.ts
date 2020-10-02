import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'

// Dependency Injection
import { DebtService } from '@services/Debt.service'
import { IDebtModel } from '@interfaces/debt.interface'
const {
  getDebtAsync,
  getDebtsAsync,
  createDebtAsync,
  updateDebtAsync,
  deleteDebtAsync,
  pushNewDebtToClient
} = new DebtService()

class DebtController {
  // @desc      Get debts
  // @route     GET /api/v1/debts/
  // @route     GET /api/v1/users/:userId/debts
  getDebts = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const debts = await getDebtsAsync(req.params.userId)

      if (!debts) {
        return next(new ErrorResponse('Debts not found', 404))
      }

      res.json({ sucess: true, count: debts?.length, debts })
    }
  );

  // @desc      Get single debt
  // @route     GET /api/v1/debts/:debtId
  getDebt = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const debt = await getDebtAsync(req.params.debtId)

      if (!debt) {
        return next(new ErrorResponse('Debt not found', 404))
      }

      res.json({ sucess: true, debt })
    }
  );

  // @desc      Create debt
  // @route     POST /api/v1/debts/
  createDebt = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { clientId, bankerId, title, description, value } = req.body as IDebtModel

      const newDebt: IDebtModel = { clientId, bankerId, title, description, value }

      const debt = await createDebtAsync(newDebt)

      if (!debt) {
        return next(new ErrorResponse('Debts not created', 500))
      }

      const client = await pushNewDebtToClient(clientId, debt._id)

      if (!client) {
        return next(new ErrorResponse('Client not found', 500))
      }

      res.json({ sucess: true, debt })
    }
  );

  // @desc      Update debt
  // @route     PUT /api/v1/debts/:debtId
  updateDebt = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { clientId, bankerId, title, description, value } = req.body as IDebtModel

      const updateDebt: IDebtModel = { clientId, bankerId, title, description, value }

      const debt = await updateDebtAsync(req.params.debtId, updateDebt)

      if (!debt) {
        return next(new ErrorResponse('Debt not found', 404))
      }

      res.json({ sucess: true, debt })
    }
  );

  // @desc      Delete debt
  // @route     DELETE /api/v1/debts/:debtId
  deleteDebt = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const debt = await deleteDebtAsync(req.params.debtId)

      if (!debt) {
        return next(new ErrorResponse('Debt not found', 404))
      }

      res.json({ sucess: true, debt: {} })
    }
  );
}

export { DebtController }
