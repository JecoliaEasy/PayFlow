import type { Transaction } from './transaction'

export interface ResumeActivite {
  dernieresTransactions: Transaction[]
  nombreRecentes: number
  nombreReussies: number
  nombreEchouees: number
  nombreEnAttente: number
}
