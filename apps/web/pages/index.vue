<template>
  <div class="min-h-screen flex flex-col bg-dark">
    <!-- Hero Section -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 font-sans">
          <span class="inline-flex items-center justify-center">
            <ManuscriptoLogo class="mr-4 h-[60px] w-auto" />
            {{ $t('index.title') }}
          </span>
        </h1>
        <p class="text-xl sm:text-2xl text-white mb-12 font-light font-serif">
          {{ $t('index.subtitle') }}
        </p>
        
        <!-- Show different buttons based on authentication status -->
        <div v-if="!isSignedIn" class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="navigateTo('/auth/login')"
            class="w-full sm:w-auto bg-white text-primary px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
          >
            {{ $t('index.login') }}
          </button>
          <button 
            @click="navigateTo('/auth/register')"
            class="w-full sm:w-auto bg-dark text-white border-2 border-slate-300 px-4 py-2 rounded-full font-medium hover:bg-neutral-900 transition-colors duration-200 cursor-pointer"
          >
            {{ $t('index.register') }}
          </button>
        </div>
        
        <!-- Show welcome message and logout when signed in -->
        <div v-else class="space-y-6">
          <div class="bg-white/10 border border-white/20 text-white px-6 py-8 rounded-lg">
            <h2 class="text-2xl font-medium mb-4">Willkommen zurück! 👋</h2>
            <p class="text-gray-300 mb-2">
              Du bist angemeldet als: <span class="font-medium">{{ user?.emailAddresses?.[0]?.emailAddress }}</span>
            </p>
            <p class="text-gray-400 text-sm">
              {{ user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Mit ' + (user?.emailAddresses?.[0]?.emailAddress || 'Google') + ' angemeldet' }}
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              @click="navigateTo('/dashboard')"
              class="w-full sm:w-auto bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            >
              Zum Dashboard
            </button>
            <button 
              @click="handleLogout"
              :disabled="loading"
              class="w-full sm:w-auto bg-dark text-white border-2 border-slate-300 px-6 py-3 rounded-full font-medium hover:bg-neutral-900 transition-colors duration-200 cursor-pointer disabled:opacity-50"
            >
              {{ loading ? 'Wird abgemeldet...' : 'Abmelden' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="py-8 text-center text-white text-sm font-light">
      <p>
        © 2025 by 
        <a href="mailto:aheck@derheckser.de" class="text-white hover:text-gray-300 transition-colors">
          Andreas Heck
        </a>
        . 
        <a href="#" class="underline text-white hover:text-gray-300 transition-colors">{{ $t('footer.terms') }}</a>
        und 
        <a href="#" class="underline text-white hover:text-gray-300 transition-colors">{{ $t('footer.privacy') }}</a>
        .
      </p>
    </footer>
  </div>
</template>

<script setup>
// Landing page - minimalist design with authentication
const clerk = useClerk()
const loading = ref(false)

// Use computed properties for real-time reactivity
const isSignedIn = computed(() => {
  const result = clerk.value?.isSignedIn || false
  console.log('Computed isSignedIn:', result)
  return result
})

const user = computed(() => {
  const result = clerk.value?.user || null
  console.log('Computed user:', result)
  return result
})

// Watch for Clerk changes and log them
watchEffect(() => {
  console.log('Clerk changed:', {
    isSignedIn: clerk.value?.isSignedIn,
    user: clerk.value?.user,
    clerkExists: !!clerk.value
  })
})

// Listen to Clerk's session events for immediate updates
onMounted(() => {
  if (clerk.value) {
    console.log('Setting up Clerk event listeners')
    
    // Listen for session changes
    clerk.value.addListener((event) => {
      console.log('Clerk event:', event)
      if (event.type === 'session:created' || event.type === 'session:updated') {
        console.log('Session updated, forcing reactivity update')
        // Force reactivity update by accessing the computed properties
        nextTick(() => {
          console.log('After nextTick - isSignedIn:', clerk.value?.isSignedIn)
        })
      }
    })
  }
})

// Handle logout
const handleLogout = async () => {
  try {
    loading.value = true
    await clerk.value.signOut()
    console.log('User logged out successfully')
    // Use window.location.href for a full page reload to ensure Clerk state is updated
    window.location.href = '/'
  } catch (error) {
    console.error('Logout error:', error)
    loading.value = false
  }
}

definePageMeta({
  layout: false // Use no layout for clean landing page
})
</script>