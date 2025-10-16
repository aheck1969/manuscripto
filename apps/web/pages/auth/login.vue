<template>
  <div class="min-h-screen flex flex-col bg-dark">
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Title and Subtitle -->
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-300 mb-4 font-sans">
            {{ $t('common.app_name') }}
          </h1>
          <p class="text-lg sm:text-xl text-white mb-8 font-light font-serif">
            {{ $t('index.subtitle') }}
          </p>
        </div>

        <!-- Social Login Buttons -->
        <div class="space-y-3 flex flex-col items-center">
          <button
            type="button"
            @click="loginWithGoogle"
            :disabled="loading"
            class="w-full max-w-[350px] border border-white/30 text-white px-4 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <!-- Google Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="mr-3">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            {{ $t('auth.continue_with_google') }}
          </button>

          <button
            type="button"
            @click="loginWithApple"
            :disabled="loading"
            class="w-full max-w-[350px] border border-white/30 text-white px-4 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <!-- Apple Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 814 1000" class="mr-3">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" fill="currentColor"/>
            </svg>
            {{ $t('auth.continue_with_apple') }}
          </button>
        </div>

        <!-- OR Separator -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-600" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-dark text-gray-400">{{ $t('auth.or') }}</span>
          </div>
        </div>

        <!-- Email Form -->
        <form @submit.prevent="handleEmailSubmit" class="space-y-4 flex flex-col items-center">
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full max-w-[350px] bg-white text-primary px-6 py-3 rounded-full font-normal placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-white/20"
            :placeholder="$t('auth.email_address')"
            :disabled="loading"
          />
          
          <button
            type="submit"
            :disabled="loading || !form.email"
            class="w-full max-w-[350px] border border-white/30 text-white px-4 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? $t('common.loading') : $t('auth.next') }}
          </button>
        </form>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-md text-center">
          {{ error }}
        </div>

        <!-- Additional Options -->
        <div class="text-center">
          <p class="text-sm text-white/50">
            {{ $t('auth.dont_have_account') }}
            <NuxtLink to="/auth/register" class="text-white hover:text-gray-300 underline">
              {{ $t('auth.create_account') }}
            </NuxtLink>
          </p>
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
// Modern login page with Clerk authentication
const { t, locale } = useI18n()
const router = useRouter()

// Clerk composables
const clerk = useClerk()

// Clerk localization
const { setClerkLocalization } = useClerkLocalization()

// Sync Clerk localization with i18n locale
watchEffect(() => {
  if (clerk.value && locale.value) {
    setClerkLocalization(locale.value)
  }
})

// Form state
const form = reactive({
  email: ''
})

const loading = ref(false)
const error = ref('')

// Map Clerk error codes to our i18n messages
const mapClerkError = (errorCode: string, t: any) => {
  const errorMap = {
    'form_identifier_not_found': t('auth.account_not_found'),
    'form_password_incorrect': t('auth.invalid_credentials'),
    'form_identifier_exists': t('auth.email_already_exists'),
    'form_password_pwned': t('auth.password_too_weak'),
    'verification_failed': t('auth.verification_failed'),
    'session_not_found': t('auth.session_expired'),
  }
  return errorMap[errorCode] || null
}

// Handle email submission (first step)
const handleEmailSubmit = async () => {
  if (!form.email) {
    error.value = t('auth.email_required')
    return
  }
  
  try {
    loading.value = true
    error.value = ''
    
    // Use Clerk's email sign-in flow
    await clerk.value.client.signIn.create({
      identifier: form.email,
      strategy: 'email_code'
    })
    
    // Redirect to verification page
    await router.push('/auth/verify-request')
    
          } catch (err: any) {
            console.error('Email sign-in error:', err)
            // Map Clerk error codes to our i18n messages
            const errorMessage = mapClerkError(err.errors?.[0]?.code, t)
            error.value = errorMessage || t('auth.login_failed')
          } finally {
    loading.value = false
  }
}

// Social login with Google
const loginWithGoogle = async () => {
  try {
    loading.value = true
    error.value = ''
    
    await clerk.value.client.signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/'
    })
    
  } catch (err: any) {
    console.error('Google login error:', err)
    error.value = err.errors?.[0]?.message || 'Google Login fehlgeschlagen'
  } finally {
    loading.value = false
  }
}

// Social login with Apple
const loginWithApple = async () => {
  try {
    loading.value = true
    error.value = ''
    
    await clerk.value.client.signIn.authenticateWithRedirect({
      strategy: 'oauth_apple',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/'
    })
    
  } catch (err: any) {
    console.error('Apple login error:', err)
    error.value = err.errors?.[0]?.message || 'Apple Login fehlgeschlagen'
  } finally {
    loading.value = false
  }
}

// Redirect if already signed in
watchEffect(() => {
  if (clerk.value.isSignedIn && clerk.value.user) {
    router.push('/')
  }
})

// Set page title and layout
useHead({
  title: computed(() => `${t('auth.sign_in_or_register')} - ${t('common.app_name')}`)
})

definePageMeta({
  layout: false // Use no layout for clean design
})
</script>
