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
      { code: 'en', name: 'English', file: 'en.json', flag: '🇺🇸' },
      { code: 'de', name: 'Deutsch', file: 'de.json', flag: '🇩🇪' },
      { code: 'fr', name: 'Français', file: 'fr.json', flag: '🇫🇷' },
      { code: 'es', name: 'Español', file: 'es.json', flag: '🇪🇸' },
      { code: 'it', name: 'Italiano', file: 'it.json', flag: '🇮🇹' },
      { code: 'pt', name: 'Português', file: 'pt.json', flag: '🇵🇹' },
      { code: 'nl', name: 'Nederlands', file: 'nl.json', flag: '🇳🇱' },
      { code: 'pl', name: 'Polski', file: 'pl.json', flag: '🇵🇱' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    },
    compilation: {
      strictMessage: false
    }
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
