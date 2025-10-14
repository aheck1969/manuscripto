// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Development tools
  devtools: { enabled: true },

  // TypeScript configuration
  typescript: {
    strict: false,
    typeCheck: false
  },

  // Runtime config for API
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8888/manuscripto/apps/api/public/api'
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Manuscripto - Schreib-App für Autoren',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Moderne Schreib-App für Autoren mit Kollaboration, Plotting-Tools und Wissensdatenbank' }
      ]
    }
  }
})