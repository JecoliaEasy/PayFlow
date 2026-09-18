import { apiClient } from '@/api/client'
import {
  versTransactionDomaine,
  type Transaction,
  type TransactionApiDTO,
  type Operateur,
} from '@/types/transaction'

export interface DemandeCollecte {
  montant: number
  numero: string
  operateur: Operateur
  cleIdempotence: string
}

export interface DemandeTransfert {
  montant: number
  numero: string
  operateur: Operateur
  cleIdempotence: string
}

export const transactionService = {
  async lister(): Promise<Transaction[]> {
    const { data } = await apiClient.get<TransactionApiDTO[]>('/transactions')
    return data.map(versTransactionDomaine)
  },

  async detail(reference: string): Promise<Transaction> {
    const { data } = await apiClient.get<TransactionApiDTO>(`/transactions/${reference}`)
    return versTransactionDomaine(data)
  },

  async collecter(demande: DemandeCollecte): Promise<Transaction> {
    const { data } = await apiClient.post<TransactionApiDTO>(
      '/transactions/collecte',
      {
        amount: demande.montant,
        phoneNumber: demande.numero,
        operator: demande.operateur,
      },
      { headers: { 'X-Idempotency-Key': demande.cleIdempotence } },
    )
    return versTransactionDomaine(data)
  },

  async transferer(demande: DemandeTransfert): Promise<Transaction> {
    const { data } = await apiClient.post<TransactionApiDTO>(
      '/transactions/transfert',
      {
        amount: demande.montant,
        phoneNumber: demande.numero,
        operator: demande.operateur,
      },
      { headers: { 'X-Idempotency-Key': demande.cleIdempotence } },
    )
    return versTransactionDomaine(data)
  },
}
