import { Banker } from '@models/banker.module'
import { IBankerModel } from '@interfaces/banker.interface'

class BankerService {
  getBankerAsync = async (bankerId: string) => {
    const banker = await Banker.findById(bankerId)

    return banker
  };

  getBankersAsync = async () => {
    const bankers = await Banker.find()

    return bankers
  };

  createBankerAsync = async (newBanker: IBankerModel) => {
    const banker = await Banker.create(newBanker)

    return banker
  };

  updateBankerAsync = async (bankerId: string, updatedBanker: IBankerModel) => {
    let banker = await Banker.findById(bankerId)

    if (banker) {
      banker = await Banker.findByIdAndUpdate(bankerId, updatedBanker, {
        new: true,
        runValidators: true
      })
    }

    return banker
  };

  deleteBankerAsync = async (bankerId: string) => {
    const banker = await Banker.findById(bankerId)

    return await banker.remove()
  };
}

export { BankerService }
