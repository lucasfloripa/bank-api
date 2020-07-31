import { Document, Schema, Types, Model, model } from 'mongoose'
import { User } from '@models/userModel'
import { IClientModel } from '@interfaces/clientInterface'

export interface ClientModel extends IClientModel, Document {}

User.discriminator(
  'Client',
  new Schema({
    debts: [{ type: Types.ObjectId, ref: 'Debt' }]
  })
)

const Client: Model<ClientModel> = model<ClientModel>('Client')

export { Client }
