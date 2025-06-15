<script setup>
import { useThemeStore } from '@/stores/theme'
const theme = useThemeStore()
theme.loadDarkFromStorage()</script>
<template>
  <div class="w-full h-screen"
    :class="{ dark: theme.isDark }">
    <RouterView :key="$route.fullPath" />
  </div>
</template>
<style scoped></style>
