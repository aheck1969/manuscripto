<template>
  <div class="min-h-screen flex flex-col bg-dark">
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 text-center">
        <!-- Title and Subtitle -->
        <div>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-300 mb-4 font-sans">
            {{ $t('common.app_name') }}
          </h1>
          <p class="text-lg sm:text-xl text-white mb-8 font-light font-serif">
            {{ $t('index.subtitle') }}
          </p>
        </div>

        <!-- Verification Message -->
        <div class="bg-white/10 border border-white/20 text-white px-6 py-8 rounded-lg">
          <div class="flex justify-center mb-4">
            <Icon name="mark_email_unread" :size="48" class="text-white/80" />
          </div>
          <h2 class="text-xl font-medium mb-2 text-center">{{ $t('auth.check_your_email') }}</h2>
          <p class="text-gray-300 mb-4 text-center">{{ $t('auth.verification_sent') }}</p>
          <p class="text-sm text-gray-400 text-center">{{ $t('auth.click_link_to_continue') }}</p>
        </div>

        <!-- Back to Login -->
        <div>
          <NuxtLink 
            to="/auth/login" 
            class="text-white hover:text-gray-300 underline text-sm"
          >
            {{ $t('auth.back_to_login') }}
          </NuxtLink>
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
// Email verification request page
const { t } = useI18n()

// Set page title and layout
useHead({
  title: computed(() => `${t('auth.check_your_email')} - ${t('common.app_name')}`)
})

definePageMeta({
  layout: false // Use no layout for clean design
})
</script>
