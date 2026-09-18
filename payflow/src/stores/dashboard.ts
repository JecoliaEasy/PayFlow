import { ref } from 'vue'
import { defineStore } from 'pinia'
import { dashboardService } from '@/services/dashboardService'
import type { ResumeActivite } from '@/types/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
  const resume = ref<ResumeActivite | null>(null)
  const chargement = ref(false)
  const chargee = ref(false)

  async function charger(force = false): Promise<void> {
    if (chargee.value && !force) return

    chargement.value = true
    try {
      resume.value = await dashboardService.resume()
      chargee.value = true
    } finally {
      chargement.value = false
    }
  }

  function invaliderCache() {
    chargee.value = false
  }

  return { resume, chargement, chargee, charger, invaliderCache }
})
