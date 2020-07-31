import { Document, Schema, Model, model } from 'mongoose'
import { IUserModel } from '@interfaces/userInterface'

export interface UserModel extends IUserModel, Document {}

const userOptions = {
  discriminatorKey: 'userType',
  collection: 'users',
  timestamps: true,
  id: false
}

const UserSchema: Schema<UserModel> = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minlength: 6,
      required: true
    },
    gender: {
      type: Number,
      enum: [0, 1],
      default: 0,
      required: true
    },
    birth: {
      type: String,
      required: true
    },
    address: {
      street: { type: String, required: true },
      number: { type: Number },
      complement: { type: String },
      district: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true }
    }
  },
  userOptions
)

const User: Model<UserModel> = model<UserModel>('User', UserSchema)

export { User }
