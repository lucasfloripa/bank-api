import { Bill } from '@models/bill.module'
import { IBillModel } from '@interfaces/bill.interface'

class BillService {
  getBillAsync = async (billId: string) => {
    const bill = await Bill.findById(billId)

    return bill
  };

  getBillsAsync = async (clientId?: string) => {
    let bills: IBillModel[]

    if (clientId === undefined) {
      bills = await Bill.find()
    } else {
      bills = await Bill.find({ clientId })
    }

    return bills
  };

  deleteBillAsync = async (billId: string) => {
    const bill = await Bill.findById(billId)

    return await bill.remove()
  };
}

export { BillService }
