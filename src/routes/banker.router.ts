import express from 'express'
import { protect } from '@middlewares/auth'

// Dependecy Injectiopn
import { BankerController } from '@controllers/Banker.controller'
const {
  getBankers,
  getBanker,
  createBanker,
  updateBanker,
  deleteBanker
} = new BankerController()

const bankerRouter = express.Router()

bankerRouter.route('/').get(protect, getBankers).post(createBanker)
bankerRouter
  .route('/:bankerId')
  .get(protect, getBanker)
  .put(protect, updateBanker)
  .delete(protect, deleteBanker)

export { bankerRouter }
