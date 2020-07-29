import express from 'express'

// Dependecy Injectiopn
import BankerController from '@controllers/bankerController'
const { getBankers, getBanker, createBanker, updateBanker, deleteBanker } = BankerController

const router = express.Router()

router.route('/')
  .get(getBankers)
  .post(createBanker)
router.route('/:bankerId')
  .get(getBanker)
  .put(updateBanker)
  .delete(deleteBanker)

export default router
