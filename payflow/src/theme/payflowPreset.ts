import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * Palette reprise de l'inspiration design : navy (primary), teal (secondary/marque),
 * bleu (tertiary), gris slate (neutral). Le teal devient la couleur "primary" PrimeVue
 * (boutons/liens/focus) ; le navy sert de couleur de texte fort et de fonds sombres.
 */
export const payflowPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#0d9488',
      600: '#0f766e',
      700: '#115e59',
      800: '#134e4a',
      900: '#0f3d3a',
      950: '#042f2c',
    },
  },
})

export const payflowCouleurs = {
  navy: '#0F172A',
  teal: '#0D9488',
  bleu: '#0284C7',
  gris: '#64748B',
}
