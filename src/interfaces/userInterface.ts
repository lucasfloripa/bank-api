export interface IUserModel {
  firstName: string
  lastName?: string
  email: string
  password: string
  gender: Gender
  birth: Date
  address: IUserAddress
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

enum Gender {
  Male = 1,
  Female = 0
}
