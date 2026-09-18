import { apiClient } from '@/api/client'
import { versTransactionDomaine, type TransactionApiDTO } from '@/types/transaction'
import type { ResumeActivite } from '@/types/dashboard'

interface ResumeActiviteApiDTO {
  recentTransactions: TransactionApiDTO[]
  recentCount: number
  successCount: number
  failedCount: number
  pendingCount: number
}

export const dashboardService = {
  async resume(): Promise<ResumeActivite> {
    const { data } = await apiClient.get<ResumeActiviteApiDTO>('/dashboard')
    return {
      dernieresTransactions: data.recentTransactions.map(versTransactionDomaine),
      nombreRecentes: data.recentCount,
      nombreReussies: data.successCount,
      nombreEchouees: data.failedCount,
      nombreEnAttente: data.pendingCount,
    }
  },
}
