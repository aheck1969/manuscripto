<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Welcome Card -->
      <div class="bg-card p-6 rounded-lg border border-border">
        <h3 class="text-lg font-semibold mb-2">{{ $t('dashboard.welcome_message') }}</h3>
        <p class="text-muted-foreground mb-4">
          {{ $t('dashboard.welcome_subtitle') }}
        </p>
        <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          {{ $t('dashboard.create_first_project') }}
        </button>
      </div>

      <!-- Recent Projects -->
      <div class="bg-card p-6 rounded-lg border border-border">
        <h3 class="text-lg font-semibold mb-4">{{ $t('dashboard.recent_projects') }}</h3>
        <div class="space-y-2">
          <div class="text-sm text-muted-foreground">
            {{ $t('dashboard.no_projects') }}
          </div>
        </div>
      </div>

      <!-- Writing Stats -->
      <div class="bg-card p-6 rounded-lg border border-border">
        <h3 class="text-lg font-semibold mb-4">{{ $t('dashboard.writing_stats') }}</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm">{{ $t('dashboard.words_today') }}:</span>
            <span class="font-medium">0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm">{{ $t('dashboard.words_this_week') }}:</span>
            <span class="font-medium">0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm">{{ $t('dashboard.goal_reached') }}:</span>
            <span class="font-medium">0%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-card p-6 rounded-lg border border-border">
      <h3 class="text-lg font-semibold mb-4">{{ $t('dashboard.quick_actions') }}</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button class="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
          <div class="text-center">
            <div class="text-2xl mb-2">📝</div>
            <div class="text-sm">{{ $t('dashboard.new_text') }}</div>
          </div>
        </button>
        <button class="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
          <div class="text-center">
            <div class="text-2xl mb-2">📚</div>
            <div class="text-sm">{{ $t('dashboard.research') }}</div>
          </div>
        </button>
        <button class="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
          <div class="text-center">
            <div class="text-2xl mb-2">🎭</div>
            <div class="text-sm">{{ $t('dashboard.characters') }}</div>
          </div>
        </button>
        <button class="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
          <div class="text-center">
            <div class="text-2xl mb-2">📊</div>
            <div class="text-sm">{{ $t('dashboard.plotting') }}</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dashboard page
const { t } = useI18n()

useHead({
  title: computed(() => `${t('dashboard.title')} - ${t('common.app_name')}`)
})
</script>
