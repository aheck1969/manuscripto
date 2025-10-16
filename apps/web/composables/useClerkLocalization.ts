import { deDE } from '@clerk/localizations'
import { enUS } from '@clerk/localizations'

export const useClerkLocalization = () => {
  // Map our i18n locales to Clerk localizations
  const clerkLocalizations = {
    'de': deDE,
    'en': enUS,
    // Add more locales as needed
  }
  
  // Function to set Clerk localization based on locale
  const setClerkLocalization = (locale: string) => {
    const clerkLocale = clerkLocalizations[locale] || enUS
    
    if (process.client) {
      // Try to access Clerk instance
      const clerk = useClerk()
      if (clerk?.value?.load) {
        clerk.value.load({
          localization: clerkLocale
        })
      }
    }
  }
  
  return {
    setClerkLocalization,
    clerkLocalizations
  }
}
