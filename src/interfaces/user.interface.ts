export interface IUserModel {
  userType?: string
  firstName: string
  lastName?: string
  email: string
  password: string
  gender: string
  birth: string
  address: string
  getSignedJwtToken?: Function
  matchPassword?: Function
}
