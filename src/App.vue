<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
  themeStore.watchSystemTheme()
})
</script>

<template>
  <div class="w-full h-screen dark:bg-[#1E1E1E]">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style scoped></style>
