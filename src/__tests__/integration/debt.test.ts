import debtService from '@services/debtService'
import mongoose from 'mongoose'
const { getDebtsAsync, createDebtAsync } = debtService

describe('When need test debts model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://flex123:flex123@teste-entrevista-flex.ihcok.mongodb.net/flex?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
  })

  it('Should receive all debts', async () => {
    const debts = await getDebtsAsync()
    expect(debts).toBeTruthy()
  })
  it('Should receive all debts from one user with id 1', async () => {
    const debts = await getDebtsAsync('1')
    expect(debts).toEqual(expect.arrayContaining([expect.objectContaining({ userId: '1' })]))
  })
  it('Should create a new debt', async () => {
    const debt = { valor: 1000, motivo: 'motivo teste', userId: '1' }
    const newDebt = await createDebtAsync(debt)
    expect(newDebt).toBeDefined()
  })

  // These methods need a debt ID to be tested
  // it('Should update a debt', async () => {})
  // it('Should get a single debt', async () => {})
  // it('Should delete a debt', async () => {})
})
