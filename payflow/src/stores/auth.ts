import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '@/services/authService'
import { definirGestionnaireSessionExpiree } from '@/api/client'
import type { Utilisateur } from '@/types/auth'
import type { ErreurApi } from '@/types/api'

export type StatutAuth = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

export const useAuthStore = defineStore('auth', () => {
  const utilisateur = ref<Utilisateur | null>(null)
  const statut = ref<StatutAuth>('idle')
  const estAuthentifie = computed(() => statut.value === 'authenticated')

  /** À appeler au démarrage de l'app pour réhydrater la session via le cookie httpOnly. */
  async function verifierSession() {
    statut.value = 'loading'
    try {
      utilisateur.value = await authService.utilisateurCourant()
      statut.value = 'authenticated'
    } catch {
      utilisateur.value = null
      statut.value = 'unauthenticated'
    }
  }

  async function connexion(identifiant: string, motDePasse: string): Promise<void> {
    statut.value = 'loading'
    try {
      utilisateur.value = await authService.connexion(identifiant, motDePasse)
      statut.value = 'authenticated'
    } catch (erreur) {
      statut.value = 'unauthenticated'
      throw erreur as ErreurApi
    }
  }

  async function deconnexion(): Promise<void> {
    try {
      await authService.deconnexion()
    } finally {
      viderSession()
    }
  }

  /** Purge locale sans appel API — utilisée aussi par le gestionnaire de session expirée. */
  function viderSession() {
    utilisateur.value = null
    statut.value = 'unauthenticated'
  }

  definirGestionnaireSessionExpiree(viderSession)

  return { utilisateur, statut, estAuthentifie, verifierSession, connexion, deconnexion, viderSession }
})
