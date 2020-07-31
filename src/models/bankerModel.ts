import { Document, Schema, Model, model } from 'mongoose'
import { User } from '@models/userModel'
import { IBankerModel } from '@interfaces/bankerInterface'

export interface BankerModel extends IBankerModel, Document {}

User.discriminator(
  'Banker',
  new Schema({
    bank: [{ type: String, required: true }]
  })
)

const Banker: Model<BankerModel> = model<BankerModel>('Banker')

export { Banker }
