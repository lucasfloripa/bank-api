import { Debt } from '@models/debt.module'
import { Client } from '@models/client.module'
import { IDebtModel } from '@interfaces/debt.interface'

class DebtService {
  getDebtAsync = async (debtId: string) => {
    const debt = await Debt.findById(debtId)

    return debt
  };

  getDebtsAsync = async (userId?: string) => {
    let debts: IDebtModel[]

    if (userId === undefined) {
      debts = await Debt.find()
    } else {
      debts = await Debt.find({ userId })
    }

    return debts
  };

  createDebtAsync = async (newDebt: IDebtModel) => {
    const debt = await Debt.create(newDebt)

    return debt
  };

  updateDebtAsync = async (debtId: string, updatedDebt: IDebtModel) => {
    let debt = await Debt.findById(debtId)

    debt = await Debt.findByIdAndUpdate(debtId, updatedDebt, {
      new: true,
      runValidators: true
    })

    return debt
  };

  deleteDebtAsync = async (debtId: string) => {
    const debt = await Debt.findById(debtId)

    return await debt.remove()
  };

  pushNewDebtToClient = async (clientId: string, debtId: string) => {
    let client = await Client.findById(clientId)

    if (client) {
      client = await Client.findByIdAndUpdate(
        clientId,
        { $push: { debts: debtId } },
        { new: true, runValidators: true }
      )
    }

    return client
  };
}

export { DebtService }
