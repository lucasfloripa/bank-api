import express from 'express'
import { protect, authorize } from '@middlewares/auth'

// Dependecy Injectiopn
import { ClientController } from '@controllers/Client.controller'
const { getClients, getClient, createClient, updateClient, deleteClient } = new ClientController()

const clientRouter = express.Router()

clientRouter.route('/')
  .get(protect, authorize('Banker', 'Admin'), getClients)
  .post(createClient)
clientRouter.route('/:clientId')
  .get(protect, authorize('Banker', 'Admin'), getClient)
  .put(protect, authorize('Client', 'Admin'), updateClient)
  .delete(protect, authorize('Client', 'Admin'), deleteClient)

export { clientRouter }
