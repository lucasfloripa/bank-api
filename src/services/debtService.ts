import { Debt } from '@models/debtModel'
import { Client } from '@models/clientModel'
import { IDebtModel } from '@interfaces/debtInterface'

class DebtService {
  public getDebtAsync = async (debtId: string) => {
    const debt = await Debt.findById(debtId)

    if (!debt) {
      return false
    }

    return debt
  }

  public getDebtsAsync = async (userId?: string) => {
    let debts: IDebtModel[]

    if (userId === undefined) {
      debts = await Debt.find()
    } else {
      debts = await Debt.find({ userId })
    }

    if (!debts) {
      return false
    }

    return debts
  }

  public createDebtAsync = async (newDebt: IDebtModel) => {
    const debt = await Debt.create(newDebt)

    if (!debt) {
      return false
    }

    return debt
  }

  public updateDebtAsync = async (debtId: string, updatedDebt: IDebtModel) => {
    let debt = await Debt.findById(debtId)

    if (!debt) {
      return false
    }

    debt = await Debt.findByIdAndUpdate(debtId, updatedDebt, { new: true, runValidators: true })

    return debt
  }

  public deleteDebtAsync = async (debtId: string) => {
    const debt = await Debt.findById(debtId)

    if (!debt) {
      return false
    }

    return await debt.remove()
  }

  public pushNewDebtToClient = async (clientId: string, debtId: string) => {
    let client = await Client.findById(clientId)

    if (!client) {
      return false
    }

    client = await Client.findByIdAndUpdate(clientId, { $push: { debts: debtId } }, { new: true, runValidators: true })

    return client
  }
}

export { DebtService }
