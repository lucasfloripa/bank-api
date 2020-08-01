import { Document, Schema, Types, Model, model } from 'mongoose'
import { IDebtModel } from '@interfaces/debtInterface'

export interface DebtModel extends IDebtModel, Document {}

const DebtSchema: Schema<DebtModel> = new Schema({
  clientId: {
    type: Types.ObjectId,
    ref: 'Client',
    required: true
  },
  bankerId: {
    type: Types.ObjectId,
    ref: 'Banker',
    required: true
  },
  reason: {
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
}, { timestamps: true })

const Debt: Model<DebtModel> = model<DebtModel>('Debt', DebtSchema)

export { Debt }
