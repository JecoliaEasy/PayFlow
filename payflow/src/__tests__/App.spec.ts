import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mounts and renders the current route', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: { template: '<div>Accueil</div>' } }],
    })

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    await router.isReady()
    expect(wrapper.text()).toContain('Accueil')
  })
})
