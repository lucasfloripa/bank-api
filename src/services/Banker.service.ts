import { Banker } from '@models/banker.module'
import { IBankerModel } from '@interfaces/banker.interface'

class BankerService {
  public getBankerAsync = async (bankerId: string) => {
    const banker = await Banker.findById(bankerId)

    return banker
  }

  public getBankersAsync = async () => {
    const bankers = await Banker.find()

    return bankers
  }

  public createBankerAsync = async (newBanker: IBankerModel) => {
    const banker = await Banker.create(newBanker)

    return banker
  }

  public updateBankerAsync = async (bankerId: string, updatedBanker: IBankerModel) => {
    let banker = await Banker.findById(bankerId)

    if (banker) {
      banker = await Banker.findByIdAndUpdate(bankerId, updatedBanker, { new: true, runValidators: true })
    }

    return banker
  }

  public deleteBankerAsync = async (bankerId: string) => {
    const banker = await Banker.findById(bankerId)

    return await banker.remove()
  }
}

export { BankerService }
