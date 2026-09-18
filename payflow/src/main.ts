import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import 'primeicons/primeicons.css'
import './assets/base.css'
import { payflowPreset } from './theme/payflowPreset'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: payflowPreset,
    options: {
      darkModeSelector: false,
    },
  },
})

app.mount('#app')
