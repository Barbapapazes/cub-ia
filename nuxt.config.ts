export default defineNuxtConfig({

  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxt/eslint'],

  devtools: { enabled: true },

  ui: {
    icons: ['simple-icons', 'ph'],
  },
  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
})
