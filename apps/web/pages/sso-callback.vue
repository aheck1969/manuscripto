<template>
  <div class="min-h-screen flex flex-col bg-dark">
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 text-center">
        <!-- Loading Message -->
        <div class="bg-white/10 border border-white/20 text-white px-6 py-8 rounded-lg">
          <div class="text-4xl mb-4">⏳</div>
          <h2 class="text-xl font-medium mb-2">{{ $t('auth.authenticating') }}</h2>
          <p class="text-gray-300">{{ $t('auth.please_wait') }}</p>
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

<script setup lang="ts">
// SSO callback page for OAuth redirects
const { t } = useI18n()
const router = useRouter()

// Handle OAuth callback
onMounted(async () => {
  try {
    // Clerk handles the OAuth callback automatically
    // We just need to wait a moment and redirect
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to dashboard
    await router.push('/')
    
  } catch (error) {
    console.error('SSO callback error:', error)
    // Redirect to login on error
    await router.push('/auth/login')
  }
})

// Set page title and layout
useHead({
  title: computed(() => `${t('auth.authenticating')} - ${t('common.app_name')}`)
})

definePageMeta({
  layout: false // Use no layout for clean design
})
</script>
