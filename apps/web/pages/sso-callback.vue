<template>
  <div class="min-h-screen flex flex-col bg-dark">
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 text-center">
        <!-- Loading Message -->
        <div class="bg-white/10 border border-white/20 text-white px-6 py-8 rounded-lg">
          <div class="flex justify-center mb-4">
            <Icon name="hourglass_empty" :size="48" class="text-white/80" />
          </div>
          <h2 class="text-xl font-medium mb-2">{{ $t('auth.authenticating') }}</h2>
          <p class="text-gray-300">{{ $t('auth.please_wait') }}</p>
          
          <!-- Debug Info -->
          <div v-if="debugInfo" class="mt-4 p-3 bg-black/20 rounded text-xs text-gray-400">
            <p>Status: {{ debugInfo.status }}</p>
            <p>Signed In: {{ debugInfo.isSignedIn }}</p>
            <p>URL: {{ debugInfo.url }}</p>
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

<script setup lang="ts">
// SSO callback page for OAuth redirects and email link verification
const { t } = useI18n()
const router = useRouter()

const debugInfo = ref(null)

// Handle callback
onMounted(async () => {
  try {
    console.log('SSO callback mounted')
    console.log('Current URL:', window.location.href)
    
    // Wait for Clerk to be ready
    let clerk = null
    let attempts = 0
    while (!clerk && attempts < 10) {
      try {
        clerk = useClerk()
        if (clerk.value) break
      } catch (e) {
        console.log('Waiting for Clerk to initialize...', attempts)
      }
      await new Promise(resolve => setTimeout(resolve, 500))
      attempts++
    }
    
    if (!clerk || !clerk.value) {
      console.error('Clerk not initialized after 5 seconds')
      debugInfo.value = {
        status: 'Clerk not initialized',
        isSignedIn: false,
        url: window.location.href
      }
      await router.push('/auth/login')
      return
    }
    
    console.log('Current user:', clerk.value.user)
    
    // Set debug info
    debugInfo.value = {
      status: 'Processing...',
      isSignedIn: clerk.value.isSignedIn,
      url: window.location.href
    }
    
    // Check if this is an email verification callback
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('__clerk_status')
    
    console.log('URL params:', Object.fromEntries(urlParams))
    
    // Handle client_mismatch error
    if (token === 'client_mismatch') {
      console.log('Client mismatch detected - this is a known Clerk issue')
      debugInfo.value.status = 'Client mismatch - redirecting to login...'
      await router.push('/auth/login')
      return
    }
    
    // Handle verified status - this means the email link was clicked
    if (token === 'verified') {
      console.log('Email link verification detected')
      debugInfo.value.status = 'Email verification successful!'
      
      // Wait for Clerk to process the verification
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Check if user is now signed in
      if (clerk.value.isSignedIn) {
        console.log('User is signed in after verification, redirecting to dashboard')
        debugInfo.value.status = 'User signed in, redirecting...'
        await router.push('/')
        return
      }
      
      // If not signed in, try to complete the sign-up
      console.log('User not signed in, trying to complete sign-up...')
      debugInfo.value.status = 'Completing sign-up...'
      
      try {
        // Check if there's a pending sign-up
        const signUp = clerk.value.client.signUp
        
        console.log('Current sign-up status:', signUp?.status)
        console.log('Current sign-up object:', signUp)
        
        if (signUp && signUp.status === 'missing_requirements') {
          console.log('Found pending sign-up, attempting to complete...')
          debugInfo.value.status = 'Attempting verification completion...'
          
          // For email link verification, we don't need to call attemptEmailAddressVerification
          // Clerk should handle this automatically when the link is clicked
          console.log('Email link verification should be automatic')
          debugInfo.value.status = 'Email verification should be automatic...'
          
          // Wait a bit more for Clerk to process
          await new Promise(resolve => setTimeout(resolve, 3000))
          
          // Check again if user is signed in
          if (clerk.value.isSignedIn) {
            console.log('User is now signed in after email verification!')
            debugInfo.value.status = 'User signed in successfully!'
            await router.push('/')
            return
          } else {
            console.log('User still not signed in after verification')
            debugInfo.value.status = 'Verification may have failed'
          }
        } else {
          console.log('No pending sign-up found or wrong status:', signUp?.status)
          debugInfo.value.status = `No pending sign-up (status: ${signUp?.status})`
        }
        
        // If we get here, something went wrong
        console.log('Redirecting to login due to incomplete verification')
        await router.push('/auth/login')
        
      } catch (completionError: any) {
        console.error('Sign-up completion failed:', completionError)
        debugInfo.value.status = `Completion failed: ${completionError.message}`
        await router.push('/auth/login')
      }
      
      return
    }
    
    // Check if user is signed in (for OAuth callbacks)
    if (clerk.value.isSignedIn) {
      console.log('User is signed in, redirecting to dashboard')
      debugInfo.value.status = 'User signed in, redirecting...'
      await router.push('/')
    } else {
      console.log('User not signed in, redirecting to login')
      await router.push('/auth/login')
    }
    
  } catch (error: any) {
    console.error('SSO callback error:', error)
    debugInfo.value = {
      status: 'Error occurred',
      isSignedIn: false,
      url: window.location.href,
      error: error.message
    }
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