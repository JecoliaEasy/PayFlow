import axios, { AxiosError } from 'axios'
import type { ErreurApi } from '@/types/api'

/**
 * Client Axios unique. Pas de timeout par défaut (choix assumé) : chaque
 * requête garde le comportement natif du navigateur.
 * withCredentials: true pour transmettre le cookie httpOnly de session.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

/** Callback branché par le store auth pour réagir à une session expirée sans dépendance circulaire. */
let gestionnaireSessionExpiree: (() => void) | null = null

export function definirGestionnaireSessionExpiree(callback: () => void) {
  gestionnaireSessionExpiree = callback
}

apiClient.interceptors.request.use((config) => {
  config.headers = config.headers ?? {}
  if (!config.headers['X-Request-Id']) {
    config.headers['X-Request-Id'] = crypto.randomUUID()
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; code?: string }>) => {
    const erreurNormalisee = normaliserErreur(error)

    if (erreurNormalisee.type === 'SESSION_EXPIREE') {
      gestionnaireSessionExpiree?.()
    }

    return Promise.reject(erreurNormalisee)
  },
)

function normaliserErreur(error: AxiosError<{ message?: string; code?: string }>): ErreurApi {
  if (!error.response) {
    return {
      type: 'RESEAU',
      message: 'Impossible de contacter le serveur.',
    }
  }

  const statusHttp = error.response.status
  const codeMetier = error.response.data?.code

  if (statusHttp === 401) {
    return {
      type: 'SESSION_EXPIREE',
      message: 'Votre session a expiré, veuillez vous reconnecter.',
      statusHttp,
    }
  }

  if (statusHttp === 400 || statusHttp === 422) {
    return {
      type: 'VALIDATION',
      message: error.response.data?.message ?? 'Certaines informations saisies sont invalides.',
      statusHttp,
      codeMetier,
    }
  }

  if (statusHttp === 409 || statusHttp === 402) {
    return {
      type: 'METIER',
      message: error.response.data?.message ?? "L'opération n'a pas pu être réalisée.",
      statusHttp,
      codeMetier,
    }
  }

  if (statusHttp >= 500) {
    return {
      type: 'SERVEUR',
      message: 'Une erreur est survenue côté serveur. Veuillez réessayer plus tard.',
      statusHttp,
    }
  }

  return {
    type: 'INCONNUE',
    message: 'Une erreur inattendue est survenue.',
    statusHttp,
  }
}
