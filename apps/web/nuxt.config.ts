// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true
  },

  // CSS Framework
  css: ['~/assets/css/main.css'],

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],

  // Tailwind CSS
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js'
  },

  // Internationalization
  i18n: {
    locales: [
      { code: 'de', name: 'Deutsch' },
      { code: 'en', name: 'English' },
      { code: 'it', name: 'Italiano' }
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default'
  },

  // Runtime config for API
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8000/api'
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
