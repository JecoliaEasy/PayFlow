import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/connexion',
      component: () => import('@/layouts/LayoutPublic.vue'),
      children: [
        {
          path: '',
          name: 'connexion',
          component: () => import('@/pages/Connexion.vue'),
          meta: { requiresAuth: false },
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/LayoutApplication.vue'),
      children: [
        {
          path: '',
          name: 'tableau-de-bord',
          component: () => import('@/pages/TableauDeBord.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'collecte',
          name: 'collecte',
          component: () => import('@/pages/Collecte.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'transfert',
          name: 'transfert',
          component: () => import('@/pages/Transfert.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'historique',
          name: 'historique',
          component: () => import('@/pages/Historique.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'transactions/:reference',
          name: 'detail-transaction',
          component: () => import('@/pages/DetailTransaction.vue'),
          meta: { requiresAuth: true },
          props: true,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'introuvable',
      component: () => import('@/pages/PageIntrouvable.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

/**
 * Guard global unique pour le contrôle d'accès : aucune vérification d'auth
 * ne doit être faite "à la main" dans les pages/composants.
 */
router.beforeEach(async (to) => {
  // Bypass temporaire tant qu'aucun backend n'est configuré (sprint design) : à retirer
  // automatiquement dès que VITE_API_BASE_URL pointe vers une vraie API.
  const bypassAuthSansBackend = import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL
  if (bypassAuthSansBackend) return true

  const authStore = useAuthStore()

  if (authStore.statut === 'idle') {
    await authStore.verifierSession()
  }

  if (to.meta.requiresAuth && !authStore.estAuthentifie) {
    return { name: 'connexion', query: { redirect: to.fullPath } }
  }

  if (to.name === 'connexion' && authStore.estAuthentifie) {
    return { name: 'tableau-de-bord' }
  }

  return true
})

export default router
