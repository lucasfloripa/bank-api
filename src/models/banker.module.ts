import { Document, Schema, Model, model } from 'mongoose'
import { User } from '@models/user.module'
import { IBankerModel } from '@interfaces/banker.interface'

export interface BankerModel extends IBankerModel, Document {}

User.discriminator(
  'Banker',
  new Schema({
    bank: [{ type: String, required: true }]
  })
)

const Banker: Model<BankerModel> = model<BankerModel>('Banker')

export { Banker }
