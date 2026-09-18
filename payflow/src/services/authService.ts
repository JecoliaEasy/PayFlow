import { apiClient } from '@/api/client'
import { versUtilisateurDomaine, type Utilisateur, type UtilisateurApiDTO } from '@/types/auth'

/**
 * Endpoints à confirmer avec l'équipe backend dès que l'API est prête.
 * Le service ne connaît ni Pinia ni Vue : il reçoit des paramètres et retourne des données typées.
 */
export const authService = {
  async connexion(identifiant: string, motDePasse: string): Promise<Utilisateur> {
    const { data } = await apiClient.post<UtilisateurApiDTO>('/auth/login', {
      identifiant,
      motDePasse,
    })
    return versUtilisateurDomaine(data)
  },

  async deconnexion(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  async utilisateurCourant(): Promise<Utilisateur> {
    const { data } = await apiClient.get<UtilisateurApiDTO>('/auth/me')
    return versUtilisateurDomaine(data)
  },
}
