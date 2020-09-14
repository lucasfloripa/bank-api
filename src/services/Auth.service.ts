import { User } from '@models/user.module'

class AuthService {
  loginAsync = async (email: string) => {
    const auth = await User.findOne({ email }).select('+password')

    return auth
  };
}

export { AuthService }
