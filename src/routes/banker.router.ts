import express from 'express'

// Dependecy Injectiopn
import { BankerController } from '@controllers/Banker.controller'
const { getBankers, getBanker, createBanker, updateBanker, deleteBanker } = new BankerController()

const bankerRouter = express.Router()

bankerRouter.route('/')
  .get(getBankers)
  .post(createBanker)
bankerRouter.route('/:bankerId')
  .get(getBanker)
  .put(updateBanker)
  .delete(deleteBanker)

export { bankerRouter }
