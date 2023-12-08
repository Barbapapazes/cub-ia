export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/content', '@nuxt/ui'],

  ui: {
    icons: ['simple-icons', 'ph'],
  },

  devtools: { enabled: true },
})
