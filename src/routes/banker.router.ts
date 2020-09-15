import express from 'express'
import { protect, authorize } from '@middlewares/auth'

// Dependecy Injectiopn
import { BankerController } from '@controllers/Banker.controller'
const { getBankers, getBanker, createBanker, updateBanker, deleteBanker } = new BankerController()

const bankerRouter = express.Router()

bankerRouter.route('/')
  .get(protect, authorize('Banker', 'Admin'), getBankers)
  .post(createBanker)
bankerRouter.route('/:bankerId')
  .get(protect, authorize('Banker', 'Admin'), getBanker)
  .put(protect, authorize('Banker', 'Admin'), updateBanker)
  .delete(protect, authorize('Banker', 'Admin'), deleteBanker)

export { bankerRouter }
