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
  <div class="w-full h-screen">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style scoped></style>
