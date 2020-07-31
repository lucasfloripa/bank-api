import { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@middlewares/asyncHandler'
import { ErrorResponse } from '@utils/ErrorResponse'

// Dependency Injection
import { ClientService } from '@services/ClientService'
const { getClientsAsync, getClientAsync, createClientAsync, updateClientAsync, deleteClientAsync } = new ClientService()

class ClientController {
  // @desc      Get clients
  // @route     GET /api/v1/clients
  public getClients = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const clients = await getClientsAsync()

    if (!clients) {
      return next(new ErrorResponse('Clients not found', 404))
    }

    res.json({ success: true, count: clients.length, clients })
  })

  // @desc      Get single client
  // @route     GET /api/v1/clients/:clientId
  public getClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const client = await getClientAsync(req.params.clientId)

    if (!client) {
      return next(new ErrorResponse('Client not found', 404))
    }

    res.json({ success: true, client })
  })

  // @desc      Create client
  // @route     POST /api/v1/clients
  public createClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const client = await createClientAsync(req.body)

    if (!client) {
      return next(new ErrorResponse('Client not created', 500))
    }

    res.json({ success: true, client })
  })

  // @desc      Update client
  // @route     PUT /api/v1/clients/:clientId
  public updateClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const client = await updateClientAsync(req.params.clientId, req.body)

    if (!client) {
      return next(new ErrorResponse('Client not found', 404))
    }

    res.json({ success: true, client })
  })

  // @desc      Delete client
  // @route     DELETE /api/v1/clients/:clientId
  public deleteClient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const client = await deleteClientAsync(req.params.clientId)

    if (!client) {
      return next(new ErrorResponse('Client not found', 404))
    }

    res.json({ success: true, client: {} })
  })
}

export { ClientController }
