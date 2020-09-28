export interface IUserModel {
  userType?: string
  name: string
  email: string
  password: string
  getSignedJwtToken?: Function
  matchPassword?: Function
}
