<template>
  <div class="min-h-screen bg-background">
    <!-- App Shell Layout -->
    <div class="flex h-screen">
      <!-- Left Sidebar: Navigation & Projects -->
      <aside class="w-64 bg-card border-r border-border">
        <div class="p-4">
          <h1 class="text-xl font-bold text-foreground">Manuscripto</h1>
        </div>
        
        <!-- Navigation -->
        <nav class="p-4">
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                <span>Dashboard</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/projects" class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                <span>Projekte</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/editor" class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                <span>Editor</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/research" class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent">
                <span>Research</span>
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
              <!-- User Menu -->
              <div class="flex items-center space-x-2">
                <span class="text-sm text-muted-foreground">Benutzer</span>
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
          <h3 class="font-semibold">Research & Notizen</h3>
        </div>
        <div class="p-4">
          <p class="text-sm text-muted-foreground">
            Hier werden Research-Items und Notizen angezeigt.
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
// Get current page title
const route = useRoute()
const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/': 'Dashboard',
    '/projects': 'Projekte',
    '/editor': 'Editor',
    '/research': 'Research'
  }
  return titles[route.path] || 'Manuscripto'
})
</script>
