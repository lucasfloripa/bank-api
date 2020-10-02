import { Document, Schema, Types, Model, model } from 'mongoose'
import { IBillModel } from '@interfaces/bill.interface'

export interface BillModel extends IBillModel, Document {}

const billOptions = {
  discriminatorKey: 'billType',
  collection: 'bills',
  timestamps: true,
  id: false
}

const BillSchema: Schema<BillModel> = new Schema(
  {
    clientId: {
      type: Types.ObjectId,
      ref: 'Client',
      required: true
    },
    title: {
      type: String,
      trim: true,
      maxlength: [20, 'Título da dívida não poder ter mais que 20 caractéres'],
      required: [true, 'Por favor informe o título da dívida']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [50, 'Motivo da dívida não poder ter mais que 50 caractéres'],
      required: [true, 'Por favor informe o motivo da dívida']
    },
    value: {
      type: Number,
      trim: true,
      maxlength: [15, 'Valor não poder ter mais que 15 caractéres'],
      required: [true, 'Por favor informe o valor da dívida']
    },
    paid: {
      type: Boolean,
      default: false
    }
  },
  billOptions
)

// Cascade remove bills Ref on clients when the bill is deleted
BillSchema.pre('remove', function (next) {
  this.model('Client').update(
    {},
    { $pull: { bills: this._id } },
    { multi: true },
    next
  )
})

const Bill: Model<BillModel> = model<BillModel>('Bill', BillSchema)

export { Bill }
