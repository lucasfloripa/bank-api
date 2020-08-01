import { Client } from '@models/clientModel'
import { IClientModel } from '@interfaces/clientInterface'

class ClientService {
  public getClientAsync = async (clientId: string) => {
    const client = await Client.findById(clientId)

    if (!client) {
      return false
    }

    return client
  }

  public getClientsAsync = async () => {
    const clients = await Client.find()

    if (!clients) {
      return false
    }

    return clients
  }

  public createClientAsync = async (newClient: IClientModel) => {
    const client = await Client.create(newClient)

    if (!client) {
      return false
    }

    return client
  }

  public updateClientAsync = async (clientId: string, updatedClient: IClientModel) => {
    let client = await Client.findById(clientId)

    if (!client) {
      return false
    }

    client = await Client.findByIdAndUpdate(clientId, updatedClient, { new: true, runValidators: true })

    return client
  }

  public deleteClientAsync = async (clientId: string) => {
    const client = await Client.findById(clientId)

    if (!client) {
      return false
    }

    return await client.remove()
  }
}

export { ClientService }
