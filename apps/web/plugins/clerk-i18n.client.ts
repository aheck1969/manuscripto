import { defineNuxtPlugin } from '#app'
import { deDE } from '@clerk/localizations'
import { enUS } from '@clerk/localizations'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (import.meta.client) {
    // Get initial locale preference
    const getInitialLocale = () => {
      // Check localStorage first
      const storedLocale = localStorage.getItem('clerk_locale')
      if (storedLocale) return storedLocale
      
      // Check i18n cookie
      const i18nCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('i18n_redirected='))
      if (i18nCookie) {
        const locale = i18nCookie.split('=')[1]
        return locale || 'de'
      }
      
      // Check browser language
      const browserLang = navigator.language.split('-')[0]
      return browserLang === 'en' ? 'en' : 'de'
    }
    
    // Set initial localization
    const initialLocale = getInitialLocale()
    const clerkLocalizations = {
      'de': deDE,
      'en': enUS,
    }
    
    const clerkLocale = clerkLocalizations[initialLocale] || deDE
    
    console.log(`🇩🇪 Configuring Clerk with ${initialLocale} localization`)
    
    // Listen for locale changes
    window.addEventListener('clerk-locale-change', (event: any) => {
      console.log(`🔄 Updating Clerk locale to: ${event.detail.locale}`)
    })
  }
})
