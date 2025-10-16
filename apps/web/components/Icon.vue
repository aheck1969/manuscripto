<template>
  <span 
    class="material-icons" 
    :class="iconClass"
    :style="{ fontSize: size + 'px' }"
  >
    {{ name }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  class: ''
})

const iconClass = computed(() => props.class)
</script>

<style scoped>
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}
</style>
