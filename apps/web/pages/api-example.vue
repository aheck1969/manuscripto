<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">{{ $t('projects.title') }}</h1>
      <button 
        @click="createProject" 
        class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
        :disabled="loading"
      >
        {{ loading ? $t('common.loading') : $t('projects.new_project') }}
      </button>
    </div>

    <!-- Projects List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer"
      >
        <div class="flex items-start justify-between mb-4">
          <h3 class="text-lg font-semibold">{{ project.title }}</h3>
          <span class="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
            {{ $t(`projects.${project.type}`) }}
          </span>
        </div>
        
        <p class="text-sm text-muted-foreground mb-4">
          {{ project.description }}
        </p>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>{{ $t('projects.words') }}:</span>
            <span class="font-medium">{{ project.word_count.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span>{{ $t('projects.chapters') }}:</span>
            <span class="font-medium">{{ project.chapter_count }}</span>
          </div>
          <div class="flex justify-between">
            <span>{{ $t('projects.last_modified') }}:</span>
            <span class="font-medium">{{ formatDate(project.updated_at) }}</span>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t border-border">
          <div class="flex space-x-2">
            <button class="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded text-sm hover:bg-primary/90">
              {{ $t('projects.open') }}
            </button>
            <button class="px-3 py-2 border border-border rounded text-sm hover:bg-accent">
              ⚙️
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="projects.length === 0" class="bg-card p-6 rounded-lg border border-border border-dashed text-center">
        <div class="text-4xl mb-4">📝</div>
        <h3 class="text-lg font-semibold mb-2">{{ $t('projects.no_projects') }}</h3>
        <p class="text-muted-foreground mb-4">
          {{ $t('projects.create_first_project') }}
        </p>
        <button 
          @click="createProject"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          :disabled="loading"
        >
          {{ $t('projects.new_project') }}
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
      {{ error }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 px-4 py-3 rounded-md">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
// API Example page demonstrating i18n integration
const { t } = useI18n()
const { get, post } = useApi()

// Reactive state
const projects = ref([])
const loading = ref(false)
const error = ref('')
const successMessage = ref('')

// Example project interface
interface Project {
  id: number
  title: string
  description: string
  type: string
  word_count: number
  chapter_count: number
  updated_at: string
}

// Fetch projects from API
const fetchProjects = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // This would make a real API call with automatic language header
    // const response = await get<Project[]>('/projects')
    
    // Mock data for demonstration
    const mockProjects: Project[] = [
      {
        id: 1,
        title: 'My Fantasy Novel',
        description: 'An exciting fantasy novel about adventures and magic.',
        type: 'novel',
        word_count: 15420,
        chapter_count: 8,
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Short Story Collection',
        description: 'A collection of short stories exploring human nature.',
        type: 'short_story',
        word_count: 8500,
        chapter_count: 12,
        updated_at: new Date().toISOString()
      }
    ]
    
    projects.value = mockProjects
  } catch (err) {
    error.value = t('errors.network_error')
    console.error('Failed to fetch projects:', err)
  } finally {
    loading.value = false
  }
}

// Create new project
const createProject = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // This would make a real API call
    // const newProject = await post<Project>('/projects', {
    //   title: 'New Project',
    //   description: 'A new writing project',
    //   type: 'novel'
    // })
    
    // Mock success
    successMessage.value = t('projects.project_created')
    
    // Refresh projects list
    await fetchProjects()
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (err) {
    error.value = t('errors.save_failed')
    console.error('Failed to create project:', err)
  } finally {
    loading.value = false
  }
}

// Format date helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// Set page title
useHead({
  title: computed(() => `${t('projects.title')} - ${t('common.app_name')}`)
})

// Fetch projects on component mount
onMounted(() => {
  fetchProjects()
})
</script>
