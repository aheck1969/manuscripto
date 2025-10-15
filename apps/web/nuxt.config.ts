// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Development tools
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  // Nitro configuration for deployment compatibility
  nitro: {
    compatibilityDate: '2025-10-15'
  },

  // CSS framework
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],

  // CSS configuration
  css: ['~/assets/css/main.css'],

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

  // i18n configuration - FINAL PATH
  i18n: {
    locales: [
      { code: 'de', name: 'Deutsch', file: 'de.json' }
    ],
    defaultLocale: 'de',
    langDir: 'locales/',
    strategy: 'no_prefix'
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