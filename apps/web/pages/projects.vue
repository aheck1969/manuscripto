<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Projekte</h1>
      <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
        Neues Projekt
      </button>
    </div>

    <!-- Project Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Project Card Template -->
      <div class="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-start justify-between mb-4">
          <h3 class="text-lg font-semibold">Mein Roman</h3>
          <span class="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
            Roman
          </span>
        </div>
        
        <p class="text-sm text-muted-foreground mb-4">
          Ein spannender Fantasy-Roman über Abenteuer und Magie.
        </p>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Wörter:</span>
            <span class="font-medium">15,420</span>
          </div>
          <div class="flex justify-between">
            <span>Kapitel:</span>
            <span class="font-medium">8</span>
          </div>
          <div class="flex justify-between">
            <span>Letzte Änderung:</span>
            <span class="font-medium">Heute</span>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t border-border">
          <div class="flex space-x-2">
            <button class="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded text-sm hover:bg-primary/90">
              Öffnen
            </button>
            <button class="px-3 py-2 border border-border rounded text-sm hover:bg-accent">
              ⚙️
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="bg-card p-6 rounded-lg border border-border border-dashed text-center">
        <div class="text-4xl mb-4">📝</div>
        <h3 class="text-lg font-semibold mb-2">Kein Projekt vorhanden</h3>
        <p class="text-muted-foreground mb-4">
          Erstelle dein erstes Projekt und beginne zu schreiben.
        </p>
        <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          Projekt erstellen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Projects page
useHead({
  title: 'Projekte - Manuscripto'
})
</script>
