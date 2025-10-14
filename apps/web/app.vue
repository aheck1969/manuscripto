<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Global app setup
useHead({
  title: 'Manuscripto',
  meta: [
    { name: 'description', content: 'Modern Writing App for Authors' }
  ]
})
</script>
