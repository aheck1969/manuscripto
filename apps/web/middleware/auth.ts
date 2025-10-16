// Auth middleware using Clerk
export default defineNuxtRouteMiddleware((to, from) => {
  const clerk = useClerk()
  
  // If user is not signed in, redirect to login
  if (!clerk.value.isSignedIn) {
    return navigateTo('/auth/login')
  }
})
