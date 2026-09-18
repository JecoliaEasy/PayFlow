import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  transactionService,
  type DemandeCollecte,
  type DemandeTransfert,
} from '@/services/transactionService'
import type { Transaction } from '@/types/transaction'

export const useTransactionsStore = defineStore('transactions', () => {
  const liste = ref<Transaction[]>([])
  const chargement = ref(false)
  /** Cache simple : tant que true, `charger()` ne rappelle pas l'API. */
  const chargee = ref(false)

  async function charger(force = false): Promise<void> {
    if (chargee.value && !force) return

    chargement.value = true
    try {
      liste.value = await transactionService.lister()
      chargee.value = true
    } finally {
      chargement.value = false
    }
  }

  async function chargerDetail(reference: string): Promise<Transaction> {
    return transactionService.detail(reference)
  }

  async function collecter(demande: DemandeCollecte): Promise<Transaction> {
    const transaction = await transactionService.collecter(demande)
    invaliderCache()
    return transaction
  }

  async function transferer(demande: DemandeTransfert): Promise<Transaction> {
    const transaction = await transactionService.transferer(demande)
    invaliderCache()
    return transaction
  }

  function invaliderCache() {
    chargee.value = false
  }

  return { liste, chargement, chargee, charger, chargerDetail, collecter, transferer, invaliderCache }
})
