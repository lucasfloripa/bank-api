export interface IDebtModel {
  clientId: string
  bankerId: string
  reason: string
  value: number
  paid?: boolean
}
