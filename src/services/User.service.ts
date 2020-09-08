import { User } from '@models/user.module'

class UserService {
  getUserAsync = async (userId: string) => {
    const user = await User.findById(userId)

    return user
  };

  getUsersAsync = async () => {
    const users = await User.find()

    return users
  };

  deleteUserAsync = async (userId: string) => {
    const user = await User.findById(userId)

    return await user.remove()
  };
}

export { UserService }
