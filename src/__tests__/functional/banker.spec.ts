import mongoose from 'mongoose'
import { Banker } from '@models/banker.module'
import { BankerService } from '@services/Banker.service'
const { createBankerAsync, getBankerAsync, getBankersAsync, updateBankerAsync, deleteBankerAsync } = new BankerService()

const bankersMock = [
  { firstName: 'Lucas', lastName: 'Gonçalves', email: 'lucas.floripa@icloud.com', password: '123123', address: { street: 'Rua João Nilo Morfim', number: 65, complement: 'Bloco A-202', district: 'Nossa Senhora do Rosário', city: 'São José', state: 'Santa Catarina', country: 'Brasil' }, birth: '20/08/1990', gender: 1, bank: 'Banco Inter' },
  { firstName: 'Rose', lastName: 'Duarte da Silva Gonçalves', email: 'rosedsg@icloud.com', password: '123123', address: { street: 'Rua João Nilo Morfim', number: 65, complement: 'Bloco A-202', district: 'Nossa Senhora do Rosário', city: 'São José', state: 'Santa Catarina', country: 'Brasil' }, birth: '22/07/1963', gender: 0, bank: 'Banco Show' }
]

describe('Banker Service Test', () => {
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
    await Banker.deleteMany({})
  })

  it('create a new banker', async () => {
    const banker = await createBankerAsync(bankersMock[0])

    expect(banker._id).toBeDefined()
  })

  it('get a single banker', async () => {
    const banker = await createBankerAsync(bankersMock[0])

    const bankerCheck = await getBankerAsync(banker._id)

    expect(bankerCheck).toEqual(
      expect.objectContaining({
        _id: banker._id
      })
    )
  })

  it('get all bankers', async () => {
    await createBankerAsync(bankersMock[0])

    await createBankerAsync(bankersMock[1])

    const bankers = await getBankersAsync()

    expect(bankers.length).toBeGreaterThanOrEqual(2)
  })

  it('update a banker', async () => {
    const banker = await createBankerAsync(bankersMock[0])

    const newBanker = await updateBankerAsync(banker._id, bankersMock[1])

    expect(newBanker).toEqual(
      expect.objectContaining({
        firstName: 'Rose'
      })
    )
  })

  it('delete a banker', async () => {
    const banker = await createBankerAsync(bankersMock[0])

    await deleteBankerAsync(banker._id)

    expect(banker).toEqual(
      expect.objectContaining({})
    )
  })
})
