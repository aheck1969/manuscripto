// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Development tools
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  // SPA Mode - wie ChatGPT (URL bleibt immer gleich)
  ssr: false,

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

  // i18n configuration - SPA COMPATIBLE
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
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