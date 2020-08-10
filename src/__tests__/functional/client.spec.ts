import mongoose from 'mongoose'
import { Client } from '@models/client.module'
import { ClientService } from '@services/Client.service'
const { createClientAsync, getClientAsync, getClientsAsync, updateClientAsync, deleteClientAsync } = new ClientService()

const clientsMock = [
  { firstName: 'Lucas', lastName: 'Gonçalves', email: 'lucas.floripa@icloud.com', password: '123123', address: { street: 'Rua João Nilo Morfim', number: 65, complement: 'Bloco A-202', district: 'Nossa Senhora do Rosário', city: 'São José', state: 'Santa Catarina', country: 'Brasil' }, birth: '20/08/1990', gender: 1, debts: [] },
  { firstName: 'Rose', lastName: 'Duarte da Silva Gonçalves', email: 'rosedsg@icloud.com', password: '123123', address: { street: 'Rua João Nilo Morfim', number: 65, complement: 'Bloco A-202', district: 'Nossa Senhora do Rosário', city: 'São José', state: 'Santa Catarina', country: 'Brasil' }, birth: '22/07/1963', gender: 0, debts: [] }
]

describe('Client Service Test', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized')
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await Client.deleteMany({})
  })

  it('create a new client', async () => {
    const client = await createClientAsync(clientsMock[0])

    expect(client._id).toBeDefined()
  })

  it('get a single client', async () => {
    const client = await createClientAsync(clientsMock[0])

    const clientCheck = await getClientAsync(client._id)

    expect(clientCheck).toEqual(
      expect.objectContaining({
        _id: client._id
      })
    )
  })

  it('get all clients', async () => {
    await createClientAsync(clientsMock[0])

    await createClientAsync(clientsMock[1])

    const clients = await getClientsAsync()

    expect(clients.length).toBeGreaterThanOrEqual(2)
  })

  it('update a client', async () => {
    const client = await createClientAsync(clientsMock[0])

    const newClient = await updateClientAsync(client._id, clientsMock[1])

    expect(newClient).toEqual(
      expect.objectContaining({
        firstName: 'Rose'
      })
    )
  })

  it('delete a client', async () => {
    const client = await createClientAsync(clientsMock[0])

    await deleteClientAsync(client._id)

    expect(client).toEqual(
      expect.objectContaining({})
    )
  })
})
