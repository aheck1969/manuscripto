<template>
  <div class="flex items-center space-x-2">
    <span class="text-sm text-gray-600">Language:</span>
    <select 
      :value="locale" 
      @change="handleLanguageChange"
      class="bg-background border border-border rounded-md px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
    >
      <option 
        v-for="lang in availableLocales" 
        :key="lang.code" 
        :value="lang.code"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
// Language Switcher Component
const { locale, locales, setLocale } = useI18n()
const availableLocales = computed(() => locales.value)

const handleLanguageChange = async (event) => {
  const selectedLang = event.target.value
  await setLocale(selectedLang)
}
</script>
