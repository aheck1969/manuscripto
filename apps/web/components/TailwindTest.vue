<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4">
    <div class="flex items-center space-x-4">
      <div class="shrink-0">
        <div class="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
          <span class="text-primary-foreground font-bold text-lg">T</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-medium text-foreground">Tailwind CSS Test</div>
        <p class="text-muted-foreground">Design System funktioniert!</p>
      </div>
    </div>
    
    <div class="space-y-2">
      <div class="bg-secondary p-3 rounded-md">
        <p class="text-secondary-foreground text-sm">Secondary Background</p>
      </div>
      
      <div class="bg-accent p-3 rounded-md">
        <p class="text-accent-foreground text-sm">Accent Background</p>
      </div>
      
      <div class="bg-muted p-3 rounded-md">
        <p class="text-muted-foreground text-sm">Muted Background</p>
      </div>
    </div>
    
    <div class="flex space-x-2">
      <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
        Primary Button
      </button>
      <button class="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors">
        Secondary Button
      </button>
    </div>
  </div>
</template>

<script setup>
// Tailwind CSS Test Component
// Demonstrates the custom design system with CSS variables
</script>
