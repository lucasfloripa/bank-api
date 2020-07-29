import { User } from '@models/userModel'
import { IUserModel } from '@interfaces/userInterface'

class UserService {
  public getUserAsync = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
      return false
    }

    return user
  }

  public getUsersAsync = async () => {
    const users = await User.find()

    if (!users) {
      return false
    }

    return users
  }

  public createUserAsync = async (newUser: IUserModel) => {
    const user = await User.create(newUser)

    if (!user) {
      return false
    }

    return user
  }

  public updateUserAsync = async (userId: string, updatedUser: IUserModel) => {
    let user = await User.findById(userId)

    if (!user) {
      return false
    }

    user = await User.findByIdAndUpdate(userId, updatedUser)

    return user
  }

  public deleteUserAsync = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
      return false
    }

    return await user.remove()
  }
}

export default new UserService()
