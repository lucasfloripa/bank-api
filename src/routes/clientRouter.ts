import express from 'express'

// Dependecy Injectiopn
import ClientController from '@controllers/clientController'
const { getClients, getClient, createClient, updateClient, deleteClient } = ClientController

const router = express.Router()

router.route('/')
  .get(getClients)
  .post(createClient)
router.route('/:clientId')
  .get(getClient)
  .put(updateClient)
  .delete(deleteClient)

export default router
