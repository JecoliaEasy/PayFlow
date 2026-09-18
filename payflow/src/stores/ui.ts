import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

/** État UI transverse : notifications/toasts, pas de logique métier. */
export const useUiStore = defineStore('ui', () => {
  const notifications = ref<Notification[]>([])

  function notifier(type: Notification['type'], message: string) {
    notifications.value.push({ id: crypto.randomUUID(), type, message })
  }

  function retirerNotification(id: string) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  return { notifications, notifier, retirerNotification }
})
