import { Banker } from '@models/bankerModel'
import { IBankerModel } from '@interfaces/bankerInterface'

class BankerService {
  public getBankerAsync = async (bankerId: string) => {
    const banker = await Banker.findById(bankerId)

    if (!banker) {
      return false
    }

    return banker
  }

  public getBankersAsync = async () => {
    const bankers = await Banker.find()

    if (!bankers) {
      return false
    }

    return bankers
  }

  public createBankerAsync = async (newBanker: IBankerModel) => {
    const banker = await Banker.create(newBanker)

    if (!banker) {
      return false
    }

    return banker
  }

  public updateBankerAsync = async (bankerId: string, updatedBanker: IBankerModel) => {
    let banker = await Banker.findById(bankerId)

    if (!banker) {
      return false
    }

    banker = await Banker.findByIdAndUpdate(bankerId, updatedBanker)

    return banker
  }

  public deleteBankerAsync = async (bankerId: string) => {
    const banker = await Banker.findById(bankerId)

    if (!banker) {
      return false
    }

    return await banker.remove()
  }
}

export default new BankerService()
