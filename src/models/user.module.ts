import { Document, Schema, Model, model } from 'mongoose'
import { IUserModel } from '@interfaces/user.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
      required: true,
      select: false
    },
    gender: {
      type: String,
      required: true
    },
    birth: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  userOptions
)

// encrypt password on create
UserSchema.pre<UserModel>('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// sign JWT and return
UserSchema.methods.getSignedJwtToken = (_id: string) => {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// match user entered password to hashed password in database
UserSchema.methods.matchPassword = async (enteredPassword: string, userPassword: string) => {
  return await bcrypt.compare(enteredPassword, userPassword)
}

const User: Model<UserModel> = model<UserModel>('User', UserSchema)

export { User }
