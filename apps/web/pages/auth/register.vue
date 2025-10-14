<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-foreground">
          {{ $t('auth.create_account') }}
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          {{ $t('auth.already_have_account') }}
          <NuxtLink to="/auth/login" class="font-medium text-primary hover:text-primary/80">
            {{ $t('auth.login') }}
          </NuxtLink>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-foreground mb-1">
              {{ $t('auth.name') }} *
            </label>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              required
              class="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :class="{ 'border-destructive': errors.name }"
              :placeholder="$t('auth.name_placeholder')"
            />
            <div v-if="errors.name" class="text-destructive text-xs mt-1">{{ errors.name }}</div>
          </div>

          <!-- First Name & Last Name -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="first_name" class="block text-sm font-medium text-foreground mb-1">
                {{ $t('auth.first_name') }}
              </label>
              <input
                id="first_name"
                v-model="form.first_name"
                name="first_name"
                type="text"
                class="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                :placeholder="$t('auth.first_name_placeholder')"
              />
            </div>
            
            <div>
              <label for="last_name" class="block text-sm font-medium text-foreground mb-1">
                {{ $t('auth.last_name') }}
              </label>
              <input
                id="last_name"
                v-model="form.last_name"
                name="last_name"
                type="text"
                class="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                :placeholder="$t('auth.last_name_placeholder')"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-foreground mb-1">
              {{ $t('auth.email') }} *
            </label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              required
              class="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :class="{ 'border-destructive': errors.email }"
              :placeholder="$t('auth.email_placeholder')"
            />
            <div v-if="errors.email" class="text-destructive text-xs mt-1">{{ errors.email }}</div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-foreground mb-1">
              {{ $t('auth.password') }} *
            </label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :class="{ 'border-destructive': errors.password }"
              :placeholder="$t('auth.password_placeholder')"
            />
            <div v-if="errors.password" class="text-destructive text-xs mt-1">{{ errors.password }}</div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-foreground mb-1">
              {{ $t('auth.confirm_password') }} *
            </label>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              name="password_confirmation"
              type="password"
              required
              class="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :class="{ 'border-destructive': errors.password_confirmation }"
              :placeholder="$t('auth.confirm_password_placeholder')"
            />
            <div v-if="errors.password_confirmation" class="text-destructive text-xs mt-1">{{ errors.password_confirmation }}</div>
          </div>

          <!-- Writing Goal -->
          <div>
            <label for="writing_goal_daily" class="block text-sm font-medium text-foreground mb-1">
              {{ $t('auth.daily_writing_goal') }}
            </label>
            <input
              id="writing_goal_daily"
              v-model.number="form.writing_goal_daily"
              name="writing_goal_daily"
              type="number"
              min="1"
              max="10000"
              class="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              :placeholder="$t('auth.writing_goal_placeholder')"
            />
            <p class="text-xs text-muted-foreground mt-1">{{ $t('auth.writing_goal_help') }}</p>
          </div>

          <!-- Preferred Language -->
          <div>
            <label for="preferred_language" class="block text-sm font-medium text-foreground mb-1">
              {{ $t('auth.preferred_language') }}
            </label>
            <select
              id="preferred_language"
              v-model="form.preferred_language"
              name="preferred_language"
              class="w-full px-3 py-2 border border-border rounded-md text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="en">🇺🇸 English</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="pt">🇵🇹 Português</option>
              <option value="nl">🇳🇱 Nederlands</option>
              <option value="pl">🇵🇱 Polski</option>
            </select>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="success" class="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 px-4 py-3 rounded-md">
          {{ success }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="mr-2">⏳</span>
            {{ loading ? $t('common.loading') : $t('auth.register') }}
          </button>
        </div>

        <!-- Terms -->
        <div class="text-center">
          <p class="text-xs text-muted-foreground">
            {{ $t('auth.by_registering') }}
            <NuxtLink to="/terms" class="text-primary hover:text-primary/80">{{ $t('auth.terms') }}</NuxtLink>
            {{ $t('auth.and') }}
            <NuxtLink to="/privacy" class="text-primary hover:text-primary/80">{{ $t('auth.privacy_policy') }}</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Registration page with comprehensive form validation
const { t } = useI18n()
const { post } = useApi()
const router = useRouter()

// Form state
const form = reactive({
  name: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  writing_goal_daily: 1000,
  preferred_language: 'en'
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')

// Validation
const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  let isValid = true
  
  if (!form.name.trim()) {
    errors.name = t('auth.name_required')
    isValid = false
  }
  
  if (!form.email.trim()) {
    errors.email = t('auth.email_required')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('auth.email_invalid')
    isValid = false
  }
  
  if (!form.password) {
    errors.password = t('auth.password_required')
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = t('auth.password_min_length')
    isValid = false
  }
  
  if (!form.password_confirmation) {
    errors.password_confirmation = t('auth.password_confirmation_required')
    isValid = false
  } else if (form.password !== form.password_confirmation) {
    errors.password_confirmation = t('auth.password_confirmation_mismatch')
    isValid = false
  }
  
  return isValid
}

// Handle registration
const handleRegister = async () => {
  if (!validateForm()) return
  
  try {
    loading.value = true
    error.value = ''
    success.value = ''
    
    const response = await post('/auth/register', form)
    
    success.value = response.message || t('auth.register_success')
    
    // Auto-login after registration
    setTimeout(async () => {
      const token = useCookie('auth-token', {
        default: () => null,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: true,
        sameSite: 'strict'
      })
      
      token.value = response.token
      
      const user = useCookie('user', {
        default: () => null,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: true,
        sameSite: 'strict'
      })
      
      user.value = response.user
      
      // Redirect to dashboard
      await router.push('/')
    }, 2000)
    
  } catch (err: any) {
    error.value = err.data?.message || t('auth.register_failed')
    
    // Handle validation errors
    if (err.data?.errors) {
      Object.keys(err.data.errors).forEach(key => {
        if (errors.hasOwnProperty(key)) {
          errors[key] = err.data.errors[key][0]
        }
      })
    }
  } finally {
    loading.value = false
  }
}

// Set page title
useHead({
  title: computed(() => `${t('auth.register')} - ${t('common.app_name')}`)
})
</script>
