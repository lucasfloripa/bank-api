import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'

// Dependency Injection
import { BankerService } from '@services/Banker.service'
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
      const banker = await createBankerAsync(req.body)

      if (!banker) {
        return next(new ErrorResponse('Banker not created', 500))
      }

      const token: string = banker.getSignedJwtToken()

      res.json({ success: true, token, banker })
    }
  );

  // @desc      Update banker
  // @route     PUT /api/v1/bankers/:bankerId
  updateBanker = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const banker = await updateBankerAsync(req.params.bankerId, req.body)

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
