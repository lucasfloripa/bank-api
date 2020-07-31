import { User } from '@models/userModel'

class UserService {
  public getUserAsync = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
      return false
    }

    return user
  };

  public getUsersAsync = async () => {
    const users = await User.find()

    if (!users) {
      return false
    }

    return users
  };

  public deleteUserAsync = async (userId: string) => {
    const user = await User.findById(userId)

    if (!user) {
      return false
    }

    return await user.remove()
  };
}

export { UserService }
