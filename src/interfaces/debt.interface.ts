export interface IDebtModel {
  clientId: string
  bankerId?: string
  title: string
  description: string
  value: number
  paid?: boolean
}
