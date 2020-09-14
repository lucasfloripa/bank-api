import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'

// Dependency Injection
import { BankerService } from '@services/Banker.service'
import { IBankerModel } from '@interfaces/banker.interface'
const {
  getBankersAsync,
  getBankerAsync,
  createBankerAsync,
  updateBankerAsync,
  deleteBankerAsync
} = new BankerService()

class BankerController {
  // @desc      Get bankers
  // @route     GET /api/v1/bankers
  getBankers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bankers = await getBankersAsync()

      if (!bankers) {
        return next(new ErrorResponse('Banker not found', 404))
      }

      res.json({ success: true, count: bankers.length, bankers })
    }
  );

  // @desc      Get single banker
  // @route     GET /api/v1/bankers/:bankerId
  getBanker = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const banker = await getBankerAsync(req.params.bankerId)

      if (!banker) {
        return next(new ErrorResponse('Banker not found', 404))
      }

      res.json({ success: true, banker })
    }
  );

  // @desc      Create banker
  // @route     POST /api/v1/bankers
  createBanker = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName, email, birth, gender, address, bank, password } = req.body as IBankerModel

      const newBanker: IBankerModel = { firstName, lastName, email, birth, gender, address, bank, password }

      const banker = await createBankerAsync(newBanker)

      if (!banker) {
        return next(new ErrorResponse('Banker not created', 500))
      }

      const token: string = banker.getSignedJwtToken(banker._id)

      res.json({ success: true, token, banker })
    }
  );

  // @desc      Update banker
  // @route     PUT /api/v1/bankers/:bankerId
  updateBanker = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName, email, birth, gender, address, bank, password } = req.body as IBankerModel

      const newBanker: IBankerModel = { firstName, lastName, email, birth, gender, address, bank, password }

      const banker = await updateBankerAsync(req.params.bankerId, newBanker)

      if (!banker) {
        return next(new ErrorResponse('Banker not found', 404))
      }

      res.json({ success: true, banker })
    }
  );

  // @desc      Delete banker
  // @route     DELETE /api/v1/bankers/:bankerId
  deleteBanker = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const banker = await deleteBankerAsync(req.params.bankerId)

      if (!banker) {
        return next(new ErrorResponse('Banker not found', 404))
      }

      res.json({ success: true, banker: {} })
    }
  );
}

export { BankerController }
