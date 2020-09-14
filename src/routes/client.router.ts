import express from 'express'
import { protect } from '@middlewares/auth'

// Dependecy Injectiopn
import { ClientController } from '@controllers/Client.controller'
const { getClients, getClient, createClient, updateClient, deleteClient } = new ClientController()

const clientRouter = express.Router()

clientRouter.route('/')
  .get(protect, getClients)
  .post(createClient)
clientRouter.route('/:clientId')
  .get(protect, getClient)
  .put(protect, updateClient)
  .delete(protect, deleteClient)

export { clientRouter }
