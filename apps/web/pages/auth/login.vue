<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-foreground">
          {{ $t('auth.sign_in_to_account') }}
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          {{ $t('auth.dont_have_account') }}
          <NuxtLink to="/auth/register" class="font-medium text-primary hover:text-primary/80">
            {{ $t('auth.create_account') }}
          </NuxtLink>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">{{ $t('auth.email') }}</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              :class="{ 'border-destructive': errors.email }"
              :placeholder="$t('auth.email')"
            />
            <div v-if="errors.email" class="text-destructive text-xs mt-1">{{ errors.email }}</div>
          </div>
          
          <div>
            <label for="password" class="sr-only">{{ $t('auth.password') }}</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              :class="{ 'border-destructive': errors.password }"
              :placeholder="$t('auth.password')"
            />
            <div v-if="errors.password" class="text-destructive text-xs mt-1">{{ errors.password }}</div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.remember"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary focus:ring-primary border-border rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-foreground">
              {{ $t('auth.remember_me') }}
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink to="/auth/forgot-password" class="font-medium text-primary hover:text-primary/80">
              {{ $t('auth.forgot_password') }}
            </NuxtLink>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="mr-2">⏳</span>
            {{ loading ? $t('common.loading') : $t('auth.login') }}
          </button>
        </div>

        <!-- Social Login -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-border" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-background text-muted-foreground">{{ $t('auth.or_continue_with') }}</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="loginWithGoogle"
              :disabled="loading"
              class="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-background text-sm font-medium text-foreground hover:bg-accent disabled:opacity-50"
            >
              <span class="mr-2">🔍</span>
              {{ $t('auth.google') }}
            </button>

            <button
              type="button"
              @click="loginWithFacebook"
              :disabled="loading"
              class="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-background text-sm font-medium text-foreground hover:bg-accent disabled:opacity-50"
            >
              <span class="mr-2">📘</span>
              {{ $t('auth.facebook') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Login page with form validation and social login
const { t } = useI18n()
const { post } = useApi()
const router = useRouter()

// Form state
const form = reactive({
  email: '',
  password: '',
  remember: false
})

const errors = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

// Validation
const validateForm = () => {
  errors.email = ''
  errors.password = ''
  
  if (!form.email) {
    errors.email = t('auth.email_required')
    return false
  }
  
  if (!form.password) {
    errors.password = t('auth.password_required')
    return false
  }
  
  return true
}

// Handle login
const handleLogin = async () => {
  if (!validateForm()) return
  
  try {
    loading.value = true
    error.value = ''
    
    const response = await post('/auth/login', form)
    
    // Store token and user data
    const token = useCookie('auth-token', {
      default: () => null,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: true,
      sameSite: 'strict'
    })
    
    token.value = response.token
    
    // Store user data
    const user = useCookie('user', {
      default: () => null,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: true,
      sameSite: 'strict'
    })
    
    user.value = response.user
    
    // Redirect to dashboard
    await router.push('/')
    
  } catch (err: any) {
    error.value = err.data?.message || t('auth.login_failed')
  } finally {
    loading.value = false
  }
}

// Social login methods (placeholder)
const loginWithGoogle = () => {
  // TODO: Implement Google OAuth
  console.log('Google login clicked')
}

const loginWithFacebook = () => {
  // TODO: Implement Facebook OAuth
  console.log('Facebook login clicked')
}

// Set page title
useHead({
  title: computed(() => `${t('auth.login')} - ${t('common.app_name')}`)
})
</script>
