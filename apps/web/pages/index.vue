<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Welcome Card -->
      <div class="bg-card p-6 rounded-lg border border-border">
        <h3 class="text-lg font-semibold mb-2">Willkommen bei Manuscripto</h3>
        <p class="text-muted-foreground mb-4">
          Deine moderne Schreib-App für Autoren mit allen Tools, die du brauchst.
        </p>
        <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          Erstes Projekt erstellen
        </button>
      </div>

      <!-- Recent Projects -->
      <div class="bg-card p-6 rounded-lg border border-border">
        <h3 class="text-lg font-semibold mb-4">Letzte Projekte</h3>
        <div class="space-y-2">
          <div class="text-sm text-muted-foreground">
            Noch keine Projekte vorhanden
          </div>
        </div>
      </div>

      <!-- Writing Stats -->
      <div class="bg-card p-6 rounded-lg border border-border">
        <h3 class="text-lg font-semibold mb-4">Schreibstatistiken</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm">Wörter heute:</span>
            <span class="font-medium">0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm">Wörter diese Woche:</span>
            <span class="font-medium">0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm">Ziel erreicht:</span>
            <span class="font-medium">0%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-card p-6 rounded-lg border border-border">
      <h3 class="text-lg font-semibold mb-4">Schnellaktionen</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button class="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
          <div class="text-center">
            <div class="text-2xl mb-2">📝</div>
            <div class="text-sm">Neuer Text</div>
          </div>
        </button>
        <button class="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
          <div class="text-center">
            <div class="text-2xl mb-2">📚</div>
            <div class="text-sm">Research</div>
          </div>
        </button>
        <button class="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
          <div class="text-center">
            <div class="text-2xl mb-2">🎭</div>
            <div class="text-sm">Charaktere</div>
          </div>
        </button>
        <button class="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
          <div class="text-center">
            <div class="text-2xl mb-2">📊</div>
            <div class="text-sm">Plotting</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dashboard page
useHead({
  title: 'Dashboard - Manuscripto'
})
</script>
