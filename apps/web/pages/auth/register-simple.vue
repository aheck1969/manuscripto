<template>
  <div class="min-h-screen flex flex-col bg-dark">
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <!-- Title and Subtitle -->
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-300 mb-4 font-sans">
            <span class="inline-flex items-center justify-center">
              <ManuscriptoLogo class="mr-4 h-8 w-auto" />
              {{ $t('common.app_name') }}
            </span>
          </h1>
          <p class="text-lg sm:text-xl text-white mb-8 font-light font-serif">
            {{ $t('index.subtitle') }}
          </p>
        </div>

        <!-- Use Clerk's built-in SignUp component -->
        <div class="bg-white/10 border border-white/20 rounded-lg p-6">
          <SignUp 
            path="/auth/register-simple"
            :redirectUrl="redirectUrl"
            signInUrl="/auth/login"
          />
        </div>

        <!-- Back to Login -->
        <div class="text-center">
          <p class="text-sm text-white/50">
            {{ $t('auth.already_have_account') }}
            <NuxtLink to="/auth/login" class="text-white hover:text-gray-300 underline">
              {{ $t('auth.sign_in') }}
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

<script setup>
// Simple registration page using Clerk's built-in components
const { t } = useI18n()

// Computed redirect URL
const redirectUrl = computed(() => {
  if (import.meta.client) {
    return `${window.location.origin}/sso-callback`
  }
  return '/sso-callback'
})

// Redirect if already signed in
const clerk = useClerk()
watchEffect(() => {
  if (clerk.value.isSignedIn && clerk.value.user) {
    navigateTo('/')
  }
})

useHead({
  title: computed(() => `${t('auth.sign_in_or_register')} - ${t('common.app_name')}`)
})

definePageMeta({
  layout: false // Use no layout for clean design
})
</script>
