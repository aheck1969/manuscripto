// Clerk plugin for client-side authentication
export default defineNuxtPlugin(() => {
  // Clerk wird automatisch durch das @clerk/nuxt Modul initialisiert
  // Die Lokalisierung wird in clerk-i18n.client.ts gehandhabt
  
  console.log('🔐 Clerk authentication initialized')
})
