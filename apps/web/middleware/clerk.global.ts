// Global Clerk middleware for Nuxt
export default defineNuxtRouteMiddleware((to, from) => {
  // Clerk wird automatisch durch das @clerk/nuxt Modul initialisiert
  // Hier können wir zusätzliche globale Middleware-Logik hinzufügen
  
  // Protect specific routes if needed
  const protectedRoutes = ['/dashboard', '/profile', '/settings']
  
  if (protectedRoutes.includes(to.path)) {
    // Check if user is authenticated
    const clerk = useClerk()
    if (clerk && !clerk.value?.isSignedIn) {
      return navigateTo('/auth/login')
    }
  }
})
