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
    compatibilityDate: '2025-10-16'
  },

  // CSS framework
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@clerk/nuxt'
  ],

  // Clerk configuration with German localization
  clerk: {
    publishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    // German localization will be set dynamically via the plugin
  },



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
      apiBase: process.env.API_BASE_URL || 'http://localhost:8888/manuscripto/apps/api/public/api',
      clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    },
    clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY
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
      redirectOn: 'root',
      fallbackLocale: 'en'
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Manuscripto',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Built for writers who build worlds.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&family=Josefin+Slab:ital,wght@0,100..700;1,100..700&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    }
  }
})