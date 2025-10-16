import { deDE } from '@clerk/localizations'
import { enUS } from '@clerk/localizations'

export const useClerkLocalization = () => {
  // Map our i18n locales to Clerk localizations
  const clerkLocalizations = {
    'de': deDE,
    'en': enUS,
    // Add more locales as needed
  }
  
  // Function to get the appropriate Clerk localization
  const getClerkLocalization = (locale: string) => {
    return clerkLocalizations[locale] || enUS
  }
  
  // Function to set Clerk localization based on locale
  const setClerkLocalization = (locale: string) => {
    const clerkLocale = getClerkLocalization(locale)
    
    // Set the localization in the global state for Clerk to pick up
    // This is a cleaner approach than trying to modify the Clerk instance directly
    if (import.meta.client) {
      // Store the locale preference for Clerk
      localStorage.setItem('clerk_locale', locale)
      
      // Dispatch a custom event that Clerk can listen to
      window.dispatchEvent(new CustomEvent('clerk-locale-change', {
        detail: { locale, clerkLocale }
      }))
    }
  }
  
  return {
    setClerkLocalization,
    getClerkLocalization,
    clerkLocalizations
  }
}
