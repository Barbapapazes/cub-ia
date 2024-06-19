export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxt/eslint'],

  ui: {
    icons: ['simple-icons', 'ph'],
  },

  eslint: {
    config: {
      stylistic: true, // <---
    },
  },

  devtools: { enabled: true },
})
