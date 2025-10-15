<template>
  <div class="min-h-screen flex flex-col bg-dark">
    <!-- Hero Section -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-300 mb-6 font-sans">
          Manuscripto
        </h1>
        <p class="text-xl sm:text-2xl text-white mb-12 font-light font-serif">
          Built for writers who build worlds.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="navigateTo('/auth/login')"
            class="w-full sm:w-auto bg-white text-primary px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
          >
            Anmelden
          </button>
          <button 
            @click="navigateTo('/auth/register')"
            class="w-full sm:w-auto bg-dark text-white border-2 border-slate-300 px-4 py-2 rounded-full font-medium hover:bg-neutral-900 transition-colors duration-200 cursor-pointer"
          >
            Kostenlos registrieren
          </button>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="py-8 text-center text-white text-sm">
      <p>
        © 2025 by 
        <a href="mailto:aheck@derheckser.de" class="text-white hover:text-gray-300 transition-colors">
          Andreas Heck
        </a>
        . 
        <a href="#" class="underline text-white hover:text-gray-300 transition-colors">Nutzungsbedingungen</a>
        und 
        <a href="#" class="underline text-white hover:text-gray-300 transition-colors">Datenschutzerklärung</a>
        .
      </p>
    </footer>
  </div>
</template>

<script setup>
// Landing page - minimalist design
definePageMeta({
  layout: false // Use no layout for clean landing page
})
</script>