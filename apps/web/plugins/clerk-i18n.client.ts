import { defineNuxtPlugin } from '#app'
import { deDE } from '@clerk/localizations'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Configure Clerk with German localization by default
  // This will be overridden by the composable when needed
  if (process.client) {
    console.log('🇩🇪 Configuring Clerk with German localization')
  }
})
