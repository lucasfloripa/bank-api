import express from 'express'

// Dependecy Injectiopn
import { ClientController } from '@controllers/Client.controller'
const { getClients, getClient, createClient, updateClient, deleteClient } = new ClientController()

const clientRouter = express.Router()

clientRouter.route('/')
  .get(getClients)
  .post(createClient)
clientRouter.route('/:clientId')
  .get(getClient)
  .put(updateClient)
  .delete(deleteClient)

export { clientRouter }
