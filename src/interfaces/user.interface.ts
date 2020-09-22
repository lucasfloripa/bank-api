export interface IUserModel {
  userType?: string
  firstName: string
  lastName?: string
  email: string
  password: string
  gender: string
  birth: string
  address: IUserAddress
  getSignedJwtToken?: Function
  matchPassword?: Function
}

interface IUserAddress {
  street: string
  number?: number
  complement?: string
  district: string
  city: string
  state: string
  country: string
}
