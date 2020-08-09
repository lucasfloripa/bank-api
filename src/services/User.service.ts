import { User } from '@models/user.module'

class UserService {
  public getUserAsync = async (userId: string) => {
    const user = await User.findById(userId)

    return user
  };

  public getUsersAsync = async () => {
    const users = await User.find()

    return users
  };

  public deleteUserAsync = async (userId: string) => {
    const user = await User.findById(userId)

    return await user.remove()
  };
}

export { UserService }
