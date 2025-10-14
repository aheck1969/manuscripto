<template>
  <div class="min-h-screen bg-background">
    <!-- App Shell Layout -->
    <div class="flex h-screen">
      <!-- Left Sidebar: Navigation & Projects -->
      <aside class="w-64 bg-card border-r border-border">
        <div class="p-4">
          <h1 class="text-xl font-bold text-foreground">{{ $t('common.app_name') }}</h1>
        </div>
        
        <!-- Navigation -->
        <nav class="p-4">
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                <span>{{ $t('navigation.dashboard') }}</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/projects" class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                <span>{{ $t('navigation.projects') }}</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/editor" class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                <span>{{ $t('navigation.editor') }}</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/research" class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                <span>{{ $t('navigation.research') }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col">
        <!-- Top Bar -->
        <header class="bg-card border-b border-border p-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">{{ pageTitle }}</h2>
            <div class="flex items-center space-x-4">
              <!-- Language Switcher -->
              <div class="flex items-center space-x-2">
                <select 
                  v-model="$i18n.locale" 
                  @change="switchLanguage"
                  class="text-sm bg-transparent border-none focus:outline-none"
                >
                  <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
                    {{ locale.flag }} {{ locale.name }}
                  </option>
                </select>
              </div>
              
              <!-- User Menu -->
              <div class="flex items-center space-x-2">
                <span class="text-sm text-muted-foreground">{{ $t('common.profile') }}</span>
                <button class="p-2 rounded-md hover:bg-accent">
                  <span>⚙️</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <div class="flex-1 p-6">
          <slot />
        </div>
      </main>

      <!-- Right Drawer: Research/Notes -->
      <aside class="w-80 bg-card border-l border-border">
        <div class="p-4">
          <h3 class="font-semibold">{{ $t('navigation.research') }} & {{ $t('research.notes') }}</h3>
        </div>
        <div class="p-4">
          <p class="text-sm text-muted-foreground">
            {{ $t('research.sources') }} und {{ $t('research.notes') }} werden hier angezeigt.
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
// Get current page title
const route = useRoute()
const { t, availableLocales } = useI18n()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/': t('navigation.dashboard'),
    '/projects': t('navigation.projects'),
    '/editor': t('navigation.editor'),
    '/research': t('navigation.research')
  }
  return titles[route.path] || t('common.app_name')
})

// Language switcher function
const switchLanguage = () => {
  // The language will be automatically switched by v-model
  // This function can be extended for additional logic if needed
}
</script>
