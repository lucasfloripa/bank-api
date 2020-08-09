import { Client } from '@models/client.module'
import { IClientModel } from '@interfaces/client.interface'

class ClientService {
  public getClientAsync = async (clientId: string) => {
    const client = await Client.findById(clientId)

    return client
  }

  public getClientsAsync = async () => {
    const clients = await Client.find()

    return clients
  }

  public createClientAsync = async (newClient: IClientModel) => {
    const client = await Client.create(newClient)

    return client
  }

  public updateClientAsync = async (clientId: string, updatedClient: IClientModel) => {
    let client = await Client.findById(clientId)

    if (client) {
      client = await Client.findByIdAndUpdate(clientId, updatedClient, { new: true, runValidators: true })
    }

    return client
  }

  public deleteClientAsync = async (clientId: string) => {
    const client = await Client.findById(clientId)

    return await client.remove()
  }
}

export { ClientService }
