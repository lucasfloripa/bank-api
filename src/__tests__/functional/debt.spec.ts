import mongoose from 'mongoose'
import { Debt } from '@models/debtModel'
import { Banker } from '@models/bankerModel'
import { Client } from '@models/clientModel'
import { ClientService } from '@services/ClientService'
import { BankerService } from '@services/BankerService'
import { DebtService } from '@services/DebtService'
const { createBankerAsync } = new BankerService()
const { createClientAsync } = new ClientService()
const { getDebtAsync, getDebtsAsync, createDebtAsync, updateDebtAsync, deleteDebtAsync, pushNewDebtToClient } = new DebtService()

const clientMock = { firstName: 'Lucas', lastName: 'Gonçalves', email: 'lucas.floripa@icloud.com', password: '123123', address: { street: 'Rua João Nilo Morfim', number: 65, complement: 'Bloco A-202', district: 'Nossa Senhora do Rosário', city: 'São José', state: 'Santa Catarina', country: 'Brasil' }, birth: '20/08/1990', gender: 1, debts: [] }

const bankerMock = { firstName: 'Rose', lastName: 'Duarte da Silva Gonçalves', email: 'rosedsg@icloud.com', password: '123123', address: { street: 'Rua João Nilo Morfim', number: 65, complement: 'Bloco A-202', district: 'Nossa Senhora do Rosário', city: 'São José', state: 'Santa Catarina', country: 'Brasil' }, birth: '22/07/1963', gender: 0, bank: 'Banco Inter' }

const debtsMock = [
  { reason: 'reason 1', value: 100 },
  { reason: 'reason 2', value: 200 }
]

describe('Debt Service Test', () => {
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
    await Debt.deleteMany({})
    await Client.deleteMany({})
    await Banker.deleteMany({})
  })

  it('create a new debt', async () => {
    const client = await createClientAsync(clientMock)

    const banker = await createBankerAsync(bankerMock)

    const debt = await createDebtAsync({ ...debtsMock[0], clientId: client._id, bankerId: banker._id })

    expect(debt._id).toBeDefined()
  })

  it('get a single debt', async () => {
    const client = await createClientAsync(clientMock)

    const banker = await createBankerAsync(bankerMock)

    const debt = await createDebtAsync({ ...debtsMock[0], clientId: client._id, bankerId: banker._id })

    const debtCheck = await getDebtAsync(debt._id)

    expect(debtCheck).toEqual(
      expect.objectContaining({
        _id: debtCheck._id
      })
    )
  })

  it('get all debts', async () => {
    const client = await createClientAsync(clientMock)

    const banker = await createBankerAsync(bankerMock)

    await createDebtAsync({ ...debtsMock[0], clientId: client._id, bankerId: banker._id })

    await createDebtAsync({ ...debtsMock[0], clientId: client._id, bankerId: banker._id })

    const debts = await getDebtsAsync()

    expect(debts.length).toBeGreaterThanOrEqual(2)
  })

  it('update a debt', async () => {
    const client = await createClientAsync(clientMock)

    const banker = await createBankerAsync(bankerMock)

    const debt = await createDebtAsync({ ...debtsMock[0], clientId: client._id, bankerId: banker._id })

    const newDebt = await updateDebtAsync(debt._id, { ...debtsMock[1], clientId: client._id, bankerId: banker._id })

    expect(newDebt).toEqual(
      expect.objectContaining({
        _id: newDebt._id
      })
    )
  })

  it('delete a debt', async () => {
    const client = await createClientAsync(clientMock)

    const banker = await createBankerAsync(bankerMock)

    const debt = await createDebtAsync({ ...debtsMock[0], clientId: client._id, bankerId: banker._id })

    await deleteDebtAsync(debt._id)

    expect(debt).toEqual(
      expect.objectContaining({})
    )
  })
})
