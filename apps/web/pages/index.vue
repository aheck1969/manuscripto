<template>
  <div class="px-4 py-6 sm:px-0">
    <!-- Language Switcher -->
    <div class="mb-6 flex justify-end">
      <LanguageSwitcher />
    </div>
    
    <div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('welcome') }}! 🎉</h1>
      <p class="text-lg text-gray-600 mb-6">{{ $t('subtitle') }}</p>
      
      <div class="space-y-4">
        <div class="bg-green-50 border border-green-200 rounded-md p-4">
          <h3 class="text-sm font-medium text-green-800">✅ Frontend (Nuxt)</h3>
          <p class="text-sm text-green-700">Läuft auf http://localhost:3000</p>
        </div>
        
        <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 class="text-sm font-medium text-blue-800">✅ Backend (Laravel)</h3>
          <p class="text-sm text-blue-700">Läuft auf http://localhost:8000</p>
        </div>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 class="text-sm font-medium text-yellow-800">✅ {{ $t('tailwind') }}</h3>
          <p class="text-sm text-yellow-700">{{ $t('success') }} mit Design System!</p>
        </div>
        
        <div class="bg-purple-50 border border-purple-200 rounded-md p-4">
          <h3 class="text-sm font-medium text-purple-800">✅ {{ $t('i18n') }}</h3>
          <p class="text-sm text-purple-700">{{ $t('success') }} - Schritt für Schritt!</p>
        </div>
      </div>
      
      <!-- Tailwind CSS Test Component -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Tailwind CSS Test</h2>
        <TailwindTest />
      </div>
    </div>
  </div>
</template>

<script setup>
// Simple dashboard page
</script>